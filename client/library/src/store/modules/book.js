export default {
    namespaced: true,
    state: {
        books: [],
        book: ''

    },
    mutations: {
        SET_BOOKS: (state, books) => state.books = books,
        SET_BOOK: (state, book) => state.book = book
    },
    actions: {
        async getBooks({ commit }) {
            const res = await fetch('http://localhost:3000/book/getbooks');
            const data = res.json();

            data.then(data => commit('SET_BOOKS', data))
        },
        async getBook({ commit }, id) {
            const res = await fetch(`http://localhost:3000/book/getbook/${id}`)
            const data = res.json();

            data.then(data => commit('SET_BOOK', data[0]))
        },
        async removeBook(_, book) {
            await fetch(`http://localhost:3000/book/removebook`, {
                method: 'POST',
                body: JSON.stringify(book),
                headers: { 'content-type': 'application/json' }
            })
        },
        async createbdNote(_, data) {
            await fetch(`http://localhost:3000/book/create${data.method}`, {
                method: "POST",
                body: JSON.stringify(data.data),
                headers: { "content-type": "application/json" },
            });
        },
        async changeBook(_, data) {
            await fetch(`http://localhost:3000/book/changeBook`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
            })
        }
    },
    getters: {
        books: (state) => state.books,
        book: (state) => state.book
    },
}