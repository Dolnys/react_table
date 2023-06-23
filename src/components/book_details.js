import React, { useEffect, useState } from 'react'
import { getBookDetails, searchBooks } from '../services/api'

const BookDetails = ({ selectedBookId }) => {
  const [bookDetails, setBookDetails] = useState(null)
  const [otherBooks, setOtherBooks] = useState([])

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookDetails(selectedBookId)
        setBookDetails(response.data.volumeInfo)
      } catch (error) {
        console.log('An error occurred while fetching book details:', error)
      }
    }

    if (selectedBookId !== null) {
      fetchBookDetails()
    }
  }, [selectedBookId])

  useEffect(() => {
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

    fetchOtherBooks()
  }, [bookDetails])

  if (selectedBookId === null) {
    return null
  }

  if (bookDetails === null) {
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
    </div>
  )
}

export default BookDetails
