import axiosClient from "./axios";

const chatApi = {
  userChats: async (id) => {
    const url = `/chat/${id}`;
    return axiosClient.get(url);
  },
  getConversation: async (id) => {
    const url = `/nhantin/getConverstation/${id}`;
    return axiosClient.get(url);
  },
  getUser: async () => {
    const url = `/auth/getUser`;
    return axiosClient.get(url);
  },
  getUserById: async (id) => {
    const url = `/auth/getUserById/${id}`;
    return axiosClient.get(url);
  },
  getMessages: async (id) => {
    const url = `/nhantin/getMessages/${id}`;
    return axiosClient.get(url);
  },
  createMessage: async (data) => {
    const url = `/nhantin/createMessage`;
    return axiosClient.post(url, data);
  },
  addMessage: async (data) => {
    const url = `/nhantin/message`;
    return axiosClient.post(url, data);
  },
  getFriendList: async (data) => {
    const url = "/auth/getAllFriend";
    return axiosClient.get(url);
  },
  getUserByUserName: async (data) => {
    const url = `/auth/findbyemail/${data}`;
    return axiosClient.get(url);
  },
  addFriend: async (id) => {
    const url = `/auth/user/${id}/friendRequest`;
    return axiosClient.patch(url);
  },
  acceptFriend: async (id) => {
    const url = `/auth/user/${id}/acceptFriend`;
    return axiosClient.patch(url);
  },
  cancelRequestAddFriend: async (id) => {
    const url = `/auth/user/${id}/cancelFriend`;
    return axiosClient.patch(url);
  },
  refuseFriend: async (id) => {
    const url = `/auth/user/${id}/refuseFriend`;
    return axiosClient.patch(url);
  },
  changeProfile: async (data) => {
    const url =  `/auth/editProfile`;
    return axiosClient.patch(url, data)
  },
  changePassword: async (data) => {
    const url = `/auth/changePassword`;
    return axiosClient.get(url, data)
  }
};

export default chatApi;
