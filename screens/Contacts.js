import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS } from '../constants'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import { useEffect } from 'react'
import { ref, get, getDatabase, child } from 'firebase/database'

import { AuthContext, AuthProvider } from '../context/AuthContext'

const Contacts = ({ navigation }) => {
    const context = useContext(AuthContext)
    const [userId, setUserId] = useState('')
    const [listUser, setListUser] = useState([])
    const userList = [];
    const [time, setTime] = useState(4);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 100);
  
      setTimeout(() => {
        clearInterval(interval);
      }, 300);
  
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('userId')
            .then((value) => {
                if (value !== null) {
                    setUserId(value)
                    console.log('userID:', value)
                } else {
                    console.log('userID not found')
                }
            })
            .catch((error) => {
                console.error('Error getting userID:', error)
            })

        const dbRef = ref(getDatabase())
        get(child(dbRef, 'users'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val()
                    const userList = Object.entries(users)
                        .filter(([uid]) => uid !== userId)
                        .map(([uid, user]) => ({
                            email: user.email,
                            profile_picture: user.profile_picture,
                            username: user.username,
                            uuid: user.uuid,
                        }))
                    setListUser(userList)
                    console.log(8888888, listUser)
                } else {
                    console.log('No data available')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [time])

    // useEffect(() => {
    //     const filteredUsers = listUser.filter((user) => user.uid !== userId);
    //     setFilteredUsers(filteredUsers);
    //   }, [listUser, userId]);

  

    // const fetchUsers = async () => {
    //
    // }

    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState()

    const handleSearch = (text) => {
        // setSearch(text)
        // const filteredData = contacts.filter((user) =>
        //     user.userName.toLowerCase().includes(text.toLowerCase())
        // )
        // setFilteredUsers(filteredData)
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() =>
                navigation.navigate('PersonalChat', {
                    friend: item.uuid,
                })
            }
            style={[
                {
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 22,
                    borderBottomColor: COLORS.secondaryWhite,
                    borderBottomWidth: 1,
                },
                index % 2 !== 0
                    ? {
                          backgroundColor: COLORS.tertiaryWhite,
                      }
                    : null,
            ]}
        >
            <View
                style={{
                    paddingVertical: 15,
                    marginRight: 22,
                }}
            >
                {/* {item.isOnline && item.isOnline == true && (
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 7,
                  backgroundColor: COLORS.green,
                  borderColor: COLORS.white,
                  borderWidth: 2,
                  position: 'absolute',
                  top: 14,
                  right: 2,
                  zIndex: 1000,
                }}
              ></View>
            )} */}

                {/* <Image
              source={item.userImg}
              resizeMode="contain"
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
            /> */}
            </View>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                <Text style={{ ...FONTS.h4, marginBottom: 4 }}>
                    {item.username}
                </Text>
                {/* <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>
              {item.lastSeen}
            </Text> */}
            </View>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 22,
                            marginTop: 22,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Contacts</Text>
                        <TouchableOpacity
                            onPress={() => console.log('Add contacts')}
                        >
                            <AntDesign
                                name="plus"
                                size={20}
                                color={COLORS.secondaryBlack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondaryWhite,
                            height: 48,
                            marginVertical: 22,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                        }}
                    >
                        <Ionicons
                            name="ios-search-outline"
                            size={24}
                            color={COLORS.black}
                        />

                        <TextInput
                            style={{
                                width: '100%',
                                height: '100%',
                                marginHorizontal: 12,
                            }}
                            value={search}
                            onChangeText={handleSearch}
                            placeholder="Search contact..."
                        />
                    </View>

                    <View
                        style={{
                            paddingBottom: 100,
                        }}
                    >
                        <FlatList
                            data={listUser}
                            renderItem={renderItem}
                            // keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Contacts
