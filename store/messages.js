export const state = () => ({
    items: []
});

export const mutations = {
    addMessage (state, message, cb) {
        state.items = [...state.items, message];
    },

    setMessages (state, updatedMessages) {
        state.items = updatedMessages;
    }
};
