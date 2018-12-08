import React, {Component} from 'react'
import { PropTypes }  from 'prop-types'
import Book from './Book.js'


class BookShelf extends React.Component {
    render(){
        const books = this.props.books
        return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.ShelfName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book,id)=>(
                      <Book
                        imageURL={book.imageLinks}
                        title={book.title}
                        author={book.authors}
                        key={book.id}
                        shelf={book.shelf}
                        onShelfChange={(shelf)=>{this.props.onShelfChange(book.id,shelf)}}
                      />
                  ))}

                </ol>
              </div>
            </div>
        )
    }
    static propTypes={
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
  }
}
export default BookShelf;
