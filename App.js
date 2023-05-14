import React, { useContext } from 'react'

import { AuthContext, AuthProvider } from './context/AuthContext'
import * as SplashScreen from 'expo-splash-screen'

import AppNav from './navigation/AppNav'


export default function App() {
    return (
        <AuthProvider>
            <AppNav/>
        </AuthProvider>
    )
}
