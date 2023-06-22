import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchBooksByAuthor } from '../services/api'

const AuthorPage = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const { author } = useParams()

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      try {
        setLoading(true)
        const response = await searchBooksByAuthor(author, 5)
        setBooks(response.data.items)
        setLoading(false)
      } catch (error) {
        console.log('An error occurred while fetching author books:', error)
        setLoading(false)
      }
    }

    fetchBooksByAuthor()
  }, [author])

  if (loading) {
    return <p>Loading author books...</p>
  }

  return (
    <div>
      <h3>Author Books:</h3>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books found for this author.</p>
      )}
    </div>
  )
}

export default AuthorPage
