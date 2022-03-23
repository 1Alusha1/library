import { createRouter, createWebHistory } from 'vue-router'
import libMain from '../views/lib-main.vue'
import libCreateBook from '../views/lib-create-book.vue'
import libCreateAuthor from '../views/lib-create-author.vue'
import libAllBook from '../views/lib-all-book.vue'
import libBook from '../views/lib-book.vue'
const routes = [
  {
    path: '/',
    name: 'main',
    component: libMain
  },
  {
    path: '/createbook',
    name: 'createbook',
    component: libCreateBook
  },
  {
    path: '/createauthor',
    name: 'createauthor',
    component: libCreateAuthor
  },
  {
    path: '/books',
    name: 'books',
    component: libAllBook,
  },
  {
    path: '/book/:id',
    name: 'book',
    component: libBook
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
