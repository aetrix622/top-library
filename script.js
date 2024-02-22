const btnAdd = document.getElementById("btnAddBook");
const addBox = document.querySelector(".add");
const btnSubmitNewBook = document.getElementById("addbutton");
const btnCancelNewBook = document.getElementById("cancelbutton");
const txtNewTitle = document.getElementById("newtitle");
const txtNewAuthor = document.getElementById("newauthor");
const txtNewPages = document.getElementById("newpages");
const rdoNewRead = document.getElementById("newread");
const bookListDiv = document.querySelector(".list");

btnAdd.addEventListener("click", e => {
    btnAdd.classList.toggle("addmode");
    if (btnAdd.classList.contains("addmode")) {
        addBox.classList.add("addmode");
    } else {
        addBox.classList.remove("addmode");
    }
});

btnSubmitNewBook.addEventListener("click", e => {
    e.preventDefault();
});

btnCancelNewBook.addEventListener("click", e => {
    e.preventDefault();
    // clear all form fields then hide the form
    txtNewTitle.textContent = "";
    txtNewAuthor.textContent = "";
    txtNewPages.textContent = "";
    rdoNewRead.checked = true;
    btnAdd.classList.remove("addmode");
    addBox.classList.remove("addmode");
});

const Book = function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.coverArt = "res/book-open-variant-outline.svg";
    this.coverArtAlt = "default cover"
};

Book.prototype.generateCardHTML = function() {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
            <div class="cover"><img src="${this.coverArt}" alt="${this.coverArtAlt}" class="default"></div>
            <div>Title</div><div>${this.title}</div>
            <div>Author</div><div>${this.author}</div>
            <div>Pages</div><div>${this.pages}</div>
            <div class="readstatus">${this.read ? "Read" : "Not Read"}</div>
    `;
    return cardDiv;
};

var books = [];
// load some default books
books.push(new Book("The Adventures of Tom Sawyer", "Samuel Clemens", 432, true));
books.push(new Book("The Hobbit", "J.R.R. Tolkien", 1024, false));
books.push(new Book("The Road", "Cormack McCarthy", 837, true));

document.addEventListener("DOMContentLoaded", e => {
    for (let book of books) {
        bookListDiv.appendChild(book.generateCardHTML());
    }
});

