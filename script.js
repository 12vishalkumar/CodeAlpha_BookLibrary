//------------------------- fetching the search button element by id ---------------------------------//
document.getElementById("search-button").addEventListener("click", function () {
    const query = document.getElementById("search-input").value;
    searchBooks(query);
});

//------------------------- fetching the search input element by id ---------------------------------//
document
    .getElementById("search-input")
    .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const query = document.getElementById("search-input").value;
        searchBooks(query);
    }
});
  
//------------------------ serching the particular book -------------------------------------------//
const searchBooks = (query) => {
    //-------------------- All type of book API Load ----------------------------------------------//
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }
        return response.json();
    })
    .then((data) => {
        //-------------- Updated data retrieval from data.items instead of data.docs --------------//
        displayBooks(data.items); 
    })
    .catch((error) => {
        console.log("Error fetching data:", error);
    });
};
 
//----------------------- display the books -------------------------------------------------------//
const displayBooks = (books) => {
    const container = document.getElementById("books-container");
    container.innerHTML = "";
    if (!books || books.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
    }
    //------------------- here showing the 10 books at a time -------------------------------------//
    books.slice(0, 10).forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.className = "book";
        const coverId = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null;
        const coverUrl = coverId
        ? coverId
        : "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";
        //-------------- If image not found the show not found ----------------------------------//
        bookElement.innerHTML = `
            <img src="${coverUrl}" alt="${book.volumeInfo.title}">
            <h3>${book.volumeInfo.title}</h3>
            <p>by ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}</p>
        `;
        //-------------- book appended from the sxisting book libaray ---------------------------//
        container.appendChild(bookElement);
    });
}