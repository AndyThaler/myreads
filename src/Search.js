import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class Search extends React.Component {
  //Adding two variables to the state of the component
  state = {
    query: "",
    books: []
  }
  //changing the search depending on the query input
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.handleSearch(query)
  }

  //Searching for the books that already are in my shelf
  filterSearch(books) {
    if(books.length > 1){
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

  //Searching for the books depending on the search
  handleSearch(query) {
    if(query){
    BooksAPI.search(query, 20).then( response => {
        this.filterSearch(response);

    }, error => {console.log("Error = " + error)}
    )
  }else this.setState({ books: []})
  }

  //if a book gets chosen, add it to the shelf
  updateShelf(book, shelf) {
   var newBooks = this.state.books.filter(title => title.id === book.id)[0]
   newBooks.shelf = shelf
   this.props.onShelfChange(newBooks, shelf)
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
                      <option>
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
