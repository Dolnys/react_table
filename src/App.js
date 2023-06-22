import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookTable from './components/book_table'
import AuthorPage from './components/author_page'
import BookDetails from './components/book_details'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookTable />} />
          <Route path="/authors/:author" element={<AuthorPage />} />
          <Route path="/books/:id" component={BookDetails} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
