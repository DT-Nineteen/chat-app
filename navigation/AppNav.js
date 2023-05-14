import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import Verification from '../screens/Verification'
import ProfileAccount from '../screens/ProfileAccount'
import PersonalChat from '../screens/PersonalChat'
import BottomTabNavigation from './BottomTabNavigation'
import AuthStack from './AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppNav = () => {
    const Stack = createNativeStackNavigator()
    const context = useContext(AuthContext)

    console.log(context)
    const login = context.login
    const userToken = context.userToken

    
    console.log(userToken)


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {userToken === null ? (
                    <AuthStack />
                ) : (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="BottomTabNavigation"
                    >
                        <Stack.Screen
                            name="BottomTabNavigation"
                            component={BottomTabNavigation}
                        />
                        <Stack.Screen
                            name="Verification"
                            component={Verification}
                        />
                        <Stack.Screen
                            name="ProfileAccount"
                            component={ProfileAccount}
                        />
                        <Stack.Screen
                            name="PersonalChat"
                            component={PersonalChat}
                        />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default AppNav
