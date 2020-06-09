export const state = () => ({
    items: []
});

export const mutations = {
    addMessage (state, message) {
        state.items = [...state.items, message];
    },

    setMessages (state, updatedMessages) {
        state.items = updatedMessages;
    }
};
