import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class Search extends React.Component {
  state = {
    query: "",
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.handleSearch(query)
  }

  clearQuery = () => {
    this.setState({ query: "" })
  }

  filterSearch(books) {
    if(books){
      books.map(book => {
      this.props.booksPlaced.forEach(bookPlaced => {
        if (book.id === bookPlaced.id) book.shelf = bookPlaced.shelf;
      })
      return book;
    })
    this.setState({
      books: books
});
} else console.log('nothing found')}

  handleSearch(query) {
    if(query){
    BooksAPI.search(query, 20).then( response => {
        this.filterSearch(response);

    }, error => {console.log("Error = " + error)}
    )
  }else this.setState({ books: []})
  }

  updateShelf(book, shelf) {
   var newBooks = this.state.books.filter(title => title.id === book.id)[0]
   newBooks.shelf = shelf
   this.setState({
     books: this.state.books
   })
   this.props.onShelfChange(book, shelf)
  }


  render() {
    let showingResults
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingResults = this.state.books.filter((book) => match.test(book.title || book.authors))
    } else showingResults = []

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingResults.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateShelf(book, e.target.value);
                      }}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
</div>
    )
  }
}

export default Search
