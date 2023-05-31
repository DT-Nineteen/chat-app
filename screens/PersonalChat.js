import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { useNavigation, useRoute } from '@react-navigation/native'
import { auth, database } from '../firebaseConfig'

import { AuthContext, AuthProvider } from '../context/AuthContext'
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    getDocs,
    orderBy,
} from 'firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage'

const PersonalChat = () => {
    const context = useContext(AuthContext)
    const userUID = context.userId
    const [userId, setUserId] = useState(userUID)
    console.log(11111111111111, userUID)
    const navigation = useNavigation()
    const route = useRoute()
    const { friend } = route.params
    console.log(2222, friend)

    const [messages, setMessages] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('userId')
            .then((value) => {
                if (value !== null) {
                    if (userId) {
                        console.log('userID:', userId)
                    } else {
                        setUserId(value)
                        console.log('Value:', value)
                    }
                } else {
                    console.log('userID not found')
                }
            })
            .catch((error) => {
                console.error('Error getting userID:', error)
            })
    }, [])

    const getAllMessages = async () => {
        const chatid =
            friend > userId ? userId + '-' + friend : friend + '-' + userId
        const messagesRef = collection(database, 'Chats', chatid, 'messages')
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'))
        const msgSnapshot = await getDocs(messagesQuery)
        const allTheMsgs = msgSnapshot.docs.map((docSnap) => {
            return {
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt.toDate(),
            }
        })
        setMessages(allTheMsgs)
    }

    useEffect(() => {
        getAllMessages()
    }, [userId])

    const onSend = async (msgArray) => {
        const msg = msgArray[0]
        const usermsg = {
            ...msg,
            sentBy: userId,
            sentTo: friend,
            createdAt: new Date(),
        }

        console.log(usermsg.sentBy, usermsg.sentTo, usermsg.createdAt)

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, usermsg)
        )

        const docid =
            friend > userId ? userId + '-' + friend : friend + '-' + userId

        try {
            const docRef = await addDoc(
                collection(database, 'Chats', docid, 'messages'),
                {
                    ...usermsg,
                    createdAt: serverTimestamp(),
                }
            )
            console.log('Document written with ID: ', docRef.id)
        } catch (error) {
            console.error('Error adding document: ', error)
        }
    }
    

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View
                    style={{
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: COLORS.primary,
                        marginRight: 5,
                        marginBottom: 5,
                    }}
                >
                    <FontAwesome name="send" size={12} color={COLORS.white} />
                </View>
            </Send>
        )
    }

    // customize sender messages
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.primary,
                    },
                }}
                textStyle={{
                    right: {
                        color: COLORS.white,
                    },
                }}
            />
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style="light" backgroundColor={COLORS.white} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    backgroundColor: COLORS.white,
                    height: 60,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Contacts')}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h4, marginLeft:10, textAlign: 'center' }}>
                       Chats
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                ></View>
            </View>

            <GiftedChat
                style={{ flex: 1 }}
                messages={messages}
                onSend={(text) => onSend(text)}
                user={{
                    _id: userId,
                }}
            />
        </SafeAreaView>
    )
}

export default PersonalChat
