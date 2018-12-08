import React, {Component} from 'react'
import { PropTypes }  from 'prop-types'

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
                        backgroundImage: `url("${this.props.imageURL.smallThumbnail}")`
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


export default Book;
