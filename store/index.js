export const state = () => ({
    currentUser: {},
    messages: [],
    rooms: [],
    users: []
});

export const mutations = {
    setCurrentUser (state, user) {
        state.currentUser = user;
    },

    addMessage (state, message) {
        state.messages = [...state.messages, message];
        // NOTE: for a room. If user is out, there're no messages (clear them)
    },

    updateUsers (state, users) {
        state.users = users;
    },

    clearData (state) {
        state.currentUser = {};
        state.messages = [];
        state.rooms = [];
        state.users = [];
    }
};
