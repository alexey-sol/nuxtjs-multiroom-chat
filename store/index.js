export const state = () => ({
    currentRoom: {},
    currentUser: {}
});

export const mutations = {
    setCurrentRoom (state, room) {
        state.currentRoom = room;
    },

    setCurrentUser (state, user) {
        state.currentUser = user;
    }
};
