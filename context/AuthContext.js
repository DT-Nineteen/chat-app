import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../ultils/config'
import { Alert } from 'react-native-web'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    const login = (userName, passWord) => {
        setIsLoading(true)


                setIsLoading(false)
                axios.post('http://192.168.71.104:5000/auth/login', {
                    userName: userName,
                    passWord: passWord,
                })
                    .then((res) => {
                        console.log(1111, res.data.status);
                        if (res.data.status === "ok") {
                            setUserToken(res.data.user); // Fixed: Assign user token from response data
                            AsyncStorage.setItem('userToken', res.data.user)
                        } else {
                            alert(res.data.status);
                        }
                        setIsLoading(false);
                    })
                    .catch((e) => {
                        console.log(`Login error: ${e}`);
                    });
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
            setIsLoading(false)
        } catch (error) {
            console.log(`error ${error}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}

// Consume the AuthContext
// export const useAuth = () => useContext(AuthContext);
