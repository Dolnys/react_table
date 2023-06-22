import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookTable from './components/book_table'
import AuthorPage from './components/author_page'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookTable />} />
          <Route path="/authors/:author" element={<AuthorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
