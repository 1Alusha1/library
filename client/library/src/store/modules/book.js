export default {
    namespaced: true,
    state: {
        book: []
    },
    mutations: {
        SET_BOOK(state, books) {
            state.book = books
        }
    },
    actions: {
        async getBooks({ commit }) {
            const res = await fetch('http://localhost:3000/book/getbook');
            const data = res.json();

            data.then(data => commit('SET_BOOK', data))
        }
    },
    getters: {
        book: (state) => state.book
    },
}