import React from 'react'
import ShelfOrg from './ShelfOrg'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class BookGroups extends React.Component {

  //when the shelf-category changes, update the shelf-visuals
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
  //Rendering the different shelves into the DOM
    render() {
      return (
        <div className="list-books">
          <div className="list-books-title">
            <span className="title-emblem"/>
            <h1>iRead</h1>
          </div>
          <div className="list-books-content">
            <ShelfOrg
              shelftitle="iRead"
              books={this.props.booksPlaced.filter(Book => Book.shelf === "currentlyReading")}
              onShelfChange={this.onCatChange}
              key="current"
              />
            <ShelfOrg
              shelftitle="iWant"
              books={this.props.booksPlaced.filter(Book => Book.shelf === "wantToRead")}
              onShelfChange={this.onCatChange}
              key="want"
              />
           <ShelfOrg
              shelftitle="i'veRead"
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
