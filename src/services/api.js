import axios from 'axios'

// const API_KEY = 'AIzaSyBjeobAKgQNXTfBZXhlMYQFd8kna5rR6Mw'
const API_KEY = 'AIzaSyBnS_SqMGtyIFjA6EEwypUyz89EotffC5M'
const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  params: {
    key: API_KEY,
  },
})

export const searchBooks = (query, maxResults) => {
  return instance.get('/volumes', {
    params: { q: query, maxResults: maxResults },
  })
}

export const getBookDetails = (bookId) => {
  return instance.get(`/volumes/${bookId}`)
}
