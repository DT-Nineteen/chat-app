import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment';

// Firebase config
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase with your project's configuration
firebase.initializeApp(firebaseConfig);

export const SendMessage = async (currentUserId, guestUserId, msgValue,imgSource) => {
    var todayDate=moment();
    try {
        return await firebase.
            database().
            ref('messages/' + currentUserId)
            .child(guestUserId).
            push({
                messege: {
                    sender: currentUserId,
                    reciever: guestUserId,
                    msg: msgValue,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A')
                },
            })
    } catch (error) {
        return error;
    }
}


export const RecieveMessage = async (currentUserId, guestUserId, msgValue,imgSource) => {
    try {
        var todayDate=moment();
        return await firebase.
            database().
            ref('messages/' + guestUserId)
            .child(currentUserId).
            push({
                messege: {
                    sender: currentUserId,
                    reciever: guestUserId,
                    msg: msgValue,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A')
                },
            })
    } catch (error) {
        return error;
    }
}