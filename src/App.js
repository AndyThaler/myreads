import React from 'react'
import { Route } from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import BookGroups from './BookGroups'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }
//After mounting components - get shelf-books from the backend-server
componentDidMount() {
  BooksAPI.getAll().then(response => {
    this.setState({
      books: response
    })
  })
}
//Update the shelf books
updateShelf = (book, shelf) => {
  BooksAPI.update(book, shelf).then(res => {
    this.setBooks();
  })
}

setBooks() {
  BooksAPI.getAll().then(response => {
    this.setState({
      books: response
    })
  })
}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BookGroups
          booksPlaced={this.state.books}
          />}
        />

        <Route path="/search" render={() =>
          <Search
            onShelfChange={this.updateShelf}
            booksPlaced={this.state.books}
          />}
        />

      </div>
    )
 }
}

export default BooksApp
