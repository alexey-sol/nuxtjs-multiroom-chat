export const state = () => ({
    currentRoom: {},
    currentUser: {},
    messages: [],
    rooms: [],
    users: []
});

export const mutations = {
    addMessage (state, message) {
        state.messages = [...state.messages, message];
    },

    addRoom (state, room) {
        state.rooms = [...state.rooms, room];
    },

    addUser (state, user) {
        state.users = [...state.users, user];
    },

    removeUser (state, userId) {
        state.users = state.users.filter(user => user.id !== userId);
    },

    setCurrentRoom (state, room) {
        state.currentRoom = room;
    },

    setCurrentUser (state, user) {
        state.currentUser = user;
    },

    setMessages (state, messages) {
        state.messages = messages;
    },

    setRooms (state, rooms) {
        state.rooms = rooms;
    },

    setUsers (state, users) {
        state.users = users;
    },

    clearState (state) {
        state.currentRoom = {};
        state.currentUser = {};
        state.messages = [];
        state.rooms = [];
        state.users = [];
    }
};
