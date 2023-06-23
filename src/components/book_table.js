import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchBooks } from '../services/api'
import BookDetails from './book_details'
import AuthorBooks from './author_books'
import googleBooksLogo from '../assets/images/google_books.png'

const BookTable = () => {
  const [books, setBooks] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate()

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
      setShowMessage(true) // Pokazuj komunikat po wyszukaniu
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

  const handleAuthorClick = (author) => {
    navigate(`/authors/${author}`)
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <img
          className="img-fluid"
          src={googleBooksLogo}
          alt="google books api logo"
        />
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter the author Name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary mb-3" onClick={handleSearch}>
            Search
          </button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p className="text-center">
                Results for the search query: {searchQuery}
              </p>
              <ul className="list-group">
                {[...new Set(books)].map((author, index) => (
                  <li
                    key={index}
                    onClick={() => handleAuthorClick(author)}
                    className="list-group-item mb-1"
                  >
                    {author}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookTable
