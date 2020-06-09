export const state = () => ({
    currentRoom: {},
    currentUser: {}
});

export const mutations = {
    clearCurrentRoom (state) {
        state.currentRoom = {};
    },

    clearCurrentUser (state) {
        state.currentUser = {};
    },

    setCurrentRoom (state, room) {
        state.currentRoom = room;
    },

    setCurrentUser (state, user) {
        state.currentUser = user;
    }
};
