import React, { useState, useEffect } from 'react'
import { searchBooks, searchBooksByAuthor } from '../services/api'
import BookDetails from './book_details'
import AuthorBooks from './author_books'

const BookTable = () => {
  const [books, setBooks] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await searchBooks(searchTerm, 5)
      const authors = response.data.items.map((book) => {
        const { volumeInfo } = book
        return volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'
      })
      setBooks(authors)
      setLoading(false)
      setSearchQuery(searchTerm)

      const authorResponse = await searchBooksByAuthor(searchTerm, 5)
      const authorBooks = authorResponse.data.items
      console.log('Author Books:', authorBooks)
    } catch (error) {
      console.log('An error occurred while fetching data:', error)
      setLoading(false)
    }
  }

  const handleRowClick = (index) => {
    setSelectedRow(index)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Szukaj</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p style={{ textAlign: 'center' }}>
            Results for the search query: {searchQuery}
          </p>
          <ul>
            {[...new Set(books)].map((author, index) => (
              <li
                key={index}
                onClick={() => handleRowClick(index)}
                className={selectedRow === index ? 'selected' : ''}
              >
                {author}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRow !== null && (
        <div>
          <h3>Selected Author: {books[selectedRow]}</h3>
          <AuthorBooks author={books[selectedRow]} />
        </div>
      )}

      <BookDetails selectedRow={selectedRow} />
    </div>
  )
}

export default BookTable
