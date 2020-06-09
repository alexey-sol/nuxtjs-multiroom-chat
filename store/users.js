export const state = () => ({
    items: []
});

export const mutations = {
    addUser (state, user) {
        state.items = [...state.items, user];
    },

    clearUsers (state) {
        state.items = [];
    },

    removeUser (state, userId) {
        state.items = state.items.filter(user => user.id !== userId);
    },

    setUsers (state, updatedUsers) {
        state.items = updatedUsers;
    }
};
