import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBook from './Components/SearchBook.js'
import BooksView from './Components/BooksView.js'


class App extends React.Component {
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

export default App;
