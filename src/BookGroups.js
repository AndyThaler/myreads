import React from 'react'
import ShelfOrg from './ShelfOrg'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class BookGroups extends React.Component {
  state = {}

  onCatChange = (bookId: string, e: any) => {
    let shorten = this.props.booksPlaced
    var filteredBook = shorten.filter(Book => Book.id === bookId)[0]
    filteredBook.shelf = e.target.value
    BooksAPI.update(filteredBook, e.target.value).then(response => {
      this.setState({
        books: shorten
      })
    })
  }

    render() {
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <ShelfOrg
              shelftitle="Currently Reading"
              books={this.props.booksPlaced.filter(Book => Book.shelf === "currentlyReading")}
              onShelfChange={this.onCatChange}
              key="current"
              />
            <ShelfOrg
              shelftitle="Wanting To Read"
              books={this.props.booksPlaced.filter(Book => Book.shelf === "wantToRead")}
              onShelfChange={this.onCatChange}
              key="want"
              />
           <ShelfOrg
              shelftitle="Already Read"
              books={this.props.booksPlaced.filter(Book => Book.shelf === "read")}
              onShelfChange={this.onCatChange}
              key="read"
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        </div>
      )
    }
}

export default BookGroups
