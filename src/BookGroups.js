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
      const shelves = {
         currentlyReading: ['iRead', 'currentlyReading'],
         wantToRead: ['iWantToRead', 'wantToRead'],
         read: ["i'veRead", 'read']
       }

      return (
        <div className="list-books">
          <div className="list-books-title">
            <span className="title-emblem"/>
            <h1>iRead</h1>
          </div>
          <div className="list-books-content">
          { Object.keys(shelves).map((shelf) =>
              <ShelfOrg key={shelf}
                shelf={shelves[shelf][0]}
                title={shelves[shelf][1]}
                books={ this.props.booksPlaced.filter(Book => Book.shelf === shelf)}
                onShelfChange={ () => { this.onCatChange() } }
                />
                )}
            </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
        </div>
      )
    }
}

export default BookGroups
