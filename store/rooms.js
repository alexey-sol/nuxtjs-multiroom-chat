export const state = () => ({
    items: []
});

export const mutations = {
    addRoom (state, room) {
        state.items = [...state.items, room];
    },

    removeRoom (state, roomId) {
        state.items = state.items.filter(room => room.id !== roomId);
    },

    setRooms (state, updatedRooms) {
        state.items = updatedRooms;
    }
};
