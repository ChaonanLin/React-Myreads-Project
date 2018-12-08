import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import { PropTypes }  from 'prop-types'
import * as BooksAPI from './BooksAPI'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

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
                (books)=>{if (books.length>0){
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
                          imageURL={book.imageLinks.smallThumbnail}
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
}

class Book extends React.Component {
    changeShelf = (e) => {
        this.props.onShelfChange(e.target.value)
    }

    render() {
        return(
            <li>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${this.props.imageURL}")`
                     }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={this.changeShelf} value={this.props.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{this.props.title}</div>
                  <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )
    }

    static propTypes = {
    imageURL: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.array,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }
}

class BookShelf extends React.Component {
    render(){
        const books = this.props.books
        console.log(books);
        return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.ShelfName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book,id)=>(
                      <Book
                        imageURL={book.imageLinks.smallThumbnail}
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

class BooksApp extends React.Component {
  state = {
      books:[]
  }

  componentDidMount(){
    this.fetchMyBooks()
  }

  fetchMyBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  changeShelf = (id,shelf) => {
      BooksAPI.update({id},shelf).then((book)=>{
          this.fetchMyBooks(book)
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={()=>(
            <SearchBook
                myBooks={this.state.books}
                onShelfChange={(id,shelf)=>{this.changeShelf(id,shelf)}}
            />
        )}
        />
        <Route exact path='/' render={()=>(
            <BooksView
                onShelfChange={(id,shelf)=>{this.changeShelf(id,shelf)}}
                books={this.state.books}
            />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
