export const state = () => ({
    currentRoom: {},
    currentUser: {},
    messages: {},
    rooms: {},
    users: {}
});

export const mutations = {
    setCurrentUser (state, user) {
        state.currentUser = user;
    },

    addMessage (state, message) {
        state.messages = [...state.messages, message];
    },

    addRoom (state, newRoom) {
        const { id } = newRoom;

        state.rooms = {
            ...state.rooms,
            [id]: newRoom
        };
    },

    updateRooms (state, rooms) {
        state.rooms = rooms;
    },

    updateUsers (state, users) {
        state.users = users;
    },

    clearData (state) {
        state.currentRoom = {};
        state.currentUser = {};
        state.messages = {};
        state.rooms = {};
        state.users = {};
    }
};
