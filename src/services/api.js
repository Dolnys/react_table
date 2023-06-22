import axios from 'axios'

const API_KEY = 'AIzaSyDHX2Dxb1UDJxfwaL4aZdKWostpx_nhpbE'

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

export const searchBooksByAuthor = (author, maxResults) => {
  return instance.get('/volumes', {
    params: { q: `inauthor:${author}`, maxResults: maxResults },
  })
}
