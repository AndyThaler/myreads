import React from 'react'
import { Route } from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import BookGroups from './BookGroups'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

componentDidMount() {
  BooksAPI.getAll().then(response => {
    this.setState({
      books: response
    })
  })
}

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
        </div>
      //  <Route path="/search" render={() =>
      //    <BookGroups
      //    onShelfChange={this.onShelfChange}
      //    booksPlaced={this.state.books}
      //    />}
    //    />

  //    </div>
    )
 }
}

export default BooksApp
