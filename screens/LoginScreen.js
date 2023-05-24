import React, { useContext, useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'


import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField'
import { AuthContext, AuthProvider } from '../context/AuthContext'

const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState(null)
    const [passWord, setPassWord] = useState(null)

    useEffect(() => {
        console.log(passWord)
    }, [passWord])

    const context = useContext(AuthContext)
    const userToken = context.userToken

    const login = context.login

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    {/* <LoginSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          /> */}
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}
                >
                    Login
                </Text>

                <InputField
                    label={'User Name'}
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                />

                <InputField
                    label={'Password'}
                    fieldButtonFunction={() => {}}
                    value={passWord}
                    onChangeText={(text) => setPassWord(text)}
                />

                <CustomButton
                    label={'Login'}
                    onPress={() => login(userName, passWord)}
                />

                <Text
                    style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: 30,
                    }}
                >
                    Or, login with ...
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        {/* <GoogleSVG height={24} width={24} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        {/* <FacebookSVG height={24} width={24} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        {/* <TwitterSVG height={24} width={24} /> */}
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}
                >
                    <Text>New to the app?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
                            {' '}
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
