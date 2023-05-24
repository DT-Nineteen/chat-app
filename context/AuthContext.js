import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { Alert } from 'react-native'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    const [userId, setUserId] = useState('')

    const login = (email, password) => {
        setIsLoading(true)
        setIsLoading(false)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                if (res._tokenResponse.idToken) {
                    console.log(222222 , res);
                    console.log(222222 , res._tokenResponse.idToken);

                    setUserToken(res._tokenResponse.idToken)
                    setUserId(res.user.uid) // Fixed: Assign user token from response data
                    AsyncStorage.setItem(
                        'userToken',
                        res._tokenResponse.idToken
                    )
                    AsyncStorage.setItem('userId', res.user.uid)
                } else {
                    console.log('Login error')
                }
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(`Login error: ${e}`)
                alert(`Login error: ${e}`)
            })
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
        <AuthContext.Provider
            value={{ login, logout, isLoading, userToken, userId }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Consume the AuthContext
// export const useAuth = () => useContext(AuthContext);
