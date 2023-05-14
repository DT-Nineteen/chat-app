import axiosClient from "./axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Util from 'expo'

const authApi = {
    login: async (data) => {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
    logout: async () => {
        await AsyncStorage.clear();
        Util.reload();
        // eslint-disable-next-line no-undef
        alert('đăng xuất thành công');
    },
    register: async (data) => {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    }

}

export default (authApi);