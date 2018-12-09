# MyReads Project

This is the final assessment project for Udacity's React Fundamentals course. I used React to create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.


## How to Start

To get started using the app:

1. Clone this [repo](https://github.com/ChaonanLin/React-Myreads-Project) to your local machine
2. Install all project dependencies with `npm install`
3. Start the server with `npm start`

## Main Features
* The main page shows 3 shelves for books. Each book is shown on the correct shelf, along with its title and all of its authors.
* You can select and categorize books you have read, are currently reading, or want to read.
* When clicking "Add More Books" link, the search page is displayed.And you can click a backwards button to go back to the main page too.
* When typing into the search field, books that match the query will be displayed on the page, along with their titles and authors.
* On search page, you can still select “currently reading”, “want to read”, or “read” to place the book in a certain shelf. And when you navigate navigates to the main page, it will appear on that shelf you selected.


## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
