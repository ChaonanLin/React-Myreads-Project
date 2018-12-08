import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import { PropTypes }  from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book.js'

class SearchBook extends React.Component {
    state = {
        books:[],
        query:''
    }

    updatequery = (e) => {
        this.setState({query:e.target.value.trim()})
        this.search(e.target.value.trim())
    }

    search = (keywords) =>  {
        if (keywords.length === 0) {
            this.setState({
                books:[],
                query:''
            })
        } else {
            BooksAPI.search(keywords).then(
                (books)=>{
                    if (books.length>0){
                    this.setState({books})
                }else {
                    this.setState({books:[]})
                }}
            )
            }
        }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={this.updatequery} value={this.state.query}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.map((book,id)=>(
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
    static propTypes = {
      myBooks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        imageLinks: PropTypes.object.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string.isRequired),
        id: PropTypes.string.isRequired
      })),
      onShelfChange: PropTypes.func.isRequired
    }

}

export default SearchBook;
