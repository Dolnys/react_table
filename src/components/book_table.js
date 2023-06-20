import React, { useState, useEffect } from 'react'
import { searchBooks } from '../services/api'

const BookTable = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await searchBooks('maritime', 20)
        setBooks(response.data.items)
        setLoading(false)
      } catch (error) {
        console.log('An error occurred while fetching data:', error)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.volumeInfo.title}</td>
                <td>
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.join(', ')}
                </td>
                <td>
                  {book.volumeInfo.categories &&
                    book.volumeInfo.categories.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BookTable
