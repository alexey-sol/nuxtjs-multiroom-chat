export const state = () => ({
    items: []
});

export const mutations = {
    addRoom (state, room) {
        state.items = [...state.items, room];
    },

    clearRooms (state) {
        state.items = [];
    },

    setRooms (state, updatedRooms) {
        state.items = updatedRooms;
    }
};
