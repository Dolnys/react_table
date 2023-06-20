import React, { useEffect, useState } from 'react'
import { getBookDetails, searchBooks } from '../services/api'

const BookDetails = ({ selectedRow }) => {
  const [bookDetails, setBookDetails] = useState(null)
  const [otherBooks, setOtherBooks] = useState([])

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookDetails(selectedRow)
        setBookDetails(response.data.volumeInfo)
      } catch (error) {
        console.log('An error occurred while fetching book details:', error)
      }
    }

    const fetchOtherBooks = async () => {
      try {
        if (bookDetails && bookDetails.authors) {
          const response = await searchBooks(
            `inauthor:${bookDetails.authors[0]}`
          )
          setOtherBooks(response.data.items)
        }
      } catch (error) {
        console.log('An error occurred while fetching other books:', error)
      }
    }

    if (selectedRow) {
      fetchBookDetails()
      fetchOtherBooks() // Call fetchOtherBooks when selectedRow changes
    }
  }, [selectedRow, bookDetails])

  if (!selectedRow) {
    return <p>Please select a book to view details.</p>
  }

  if (!bookDetails) {
    return <p>Loading book details...</p>
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <p>Author(s): {bookDetails.authors && bookDetails.authors.join(', ')}</p>
      <p>
        Category: {bookDetails.categories && bookDetails.categories.join(', ')}
      </p>
      <p>Description: {bookDetails.description}</p>

      {otherBooks.length > 0 && (
        <div>
          <h3>Other Books by {bookDetails.authors[0]}</h3>
          <ul>
            {otherBooks.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BookDetails
