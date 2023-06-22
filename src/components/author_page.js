import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { searchBooksByAuthor } from '../services/api'
import BookDetails from './book_details'

const AuthorPage = () => {
  const [books, setBooks] = useState([])
  const [selectedBookId, setSelectedBookId] = useState(null)
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

  const handleRowClick = (bookId) => {
    setSelectedBookId(bookId)
  }

  if (loading) {
    return <p>Loading author books...</p>
  }

  return (
    <div>
      <nav>
        <Link to="/">Main Page</Link> {'>'} {author}
      </nav>
      <h3>Author Books:</h3>
      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published Date</th>
              <th>Language</th>
              <th>Page Count</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                onClick={() => handleRowClick(book.id)}
                className={selectedBookId === book.id ? 'selected' : ''}
              >
                <td>
                  <Link to={`/books/${book.id}`}>{book.volumeInfo.title}</Link>
                </td>
                <td>{book.volumeInfo.categories?.join(', ') || 'N/A'}</td>
                <td>{book.volumeInfo.publishedDate}</td>
                <td>{book.volumeInfo.language}</td>
                <td>{book.volumeInfo.pageCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found for this author.</p>
      )}
      {selectedBookId && <BookDetails selectedBookId={selectedBookId} />}
    </div>
  )
}

export default AuthorPage
