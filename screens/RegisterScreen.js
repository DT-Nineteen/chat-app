import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native'

import { getDatabase, ref, set } from 'firebase/database'

import { auth } from '../firebaseConfig'

import InputField from '../components/InputField'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import CustomButton from '../components/CustomButton'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassWord] = useState(null)

    const handleSignUp = async () => {
        if (email !== '' && password !== '') {
            try {
                const res = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                console.log(res)
                const uid = res.user.uid
                await writeUserData(uid, name, email, '')
                console.log(111111, uid)

                await updateProfile(auth.currentUser, {
                    displayName: name,
                })

                alert('User created successfully')
                navigation.navigate('LoginScreen')
            } catch (err) {
                console.log(err)
                alert(err)
            }
        } else {
            alert('Fill all fields')
        }
    }

    const writeUserData = (userId, name, email, imageUrl) => {
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl,
            uuid: userId,
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}
            >
                <View style={{ alignItems: 'center' }}></View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}
                >
                    Register
                </Text>
                <InputField
                    label={'Name'}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <InputField
                    label={'Email'}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <InputField
                    label={'Password'}
                    inputType="password"
                    value={password}
                    onChangeText={(text) => setPassWord(text)}
                />

                {/* <InputField label={'Confirm Password'} inputType="password" /> */}

                <CustomButton
                    label={'Register'}
                    onPress={() => {
                        handleSignUp()
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}
                >
                    <Text>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
                            {' '}
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen
