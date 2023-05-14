import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../ultils/config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    const login = (userName, passWord) => {
        setIsLoading(true)

        AsyncStorage.setItem('userToken', '123123123')
                // setUserToken(userInfo.user)
                // AsyncStorage.setItem('userToken', '123123123');

                setIsLoading(false)
        // axios
        //     .post(`http://172.20.10.5:5000/auth/login`, {
        //         userName,
        //         passWord,
        //     })
        //     .then((res) => {
        //         console.log(res.data)
        //         setUserInfo(res.data)
        //         console.log(22222,userInfo)
        //         console.log(333333,userInfo.user)

        //         setUserToken(userInfo.user)
        //         // console.log(111, userToken)
        //         AsyncStorage.setItem('userToken', userToken)
        //         setIsLoading(false)
        //     })
        //     .catch((e) => {
        //         console.log(`Login error: ${e}`)
        //     })
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
