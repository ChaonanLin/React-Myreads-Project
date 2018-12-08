import React, {Component} from 'react'
import { PropTypes }  from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class BooksView extends React.Component {
    render(){
        const shelfs = [
            {
                name:'Currently Reading',
                status:'currentlyReading'
            },
            {
                name:'Want to Read',
                status:'wantToRead'
            },
            {
                name:'Read',
                status:'read'
            },
        ]

        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                { shelfs.map((shelf,id)=> (
                    < BookShelf
                        ShelfName={shelf.name}
                        key={id}
                        books={this.props.books.filter((book)=>book.shelf === shelf.status)}
                        onShelfChange={(id,shelf)=>{this.props.onShelfChange(id,shelf)}}
                    />
                    ))
                }
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )
    }
    static propTypes = {
      books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
      id: PropTypes.string.isRequired,
    })),
    onShelfChange: PropTypes.func.isRequired
  }
}
export default BooksView;
