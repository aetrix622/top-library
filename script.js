const btnAdd = document.getElementById("btnAddBook");
const addBox = document.querySelector(".add");
const btnSubmitNewBook = document.getElementById("addbutton");
const btnCancelNewBook = document.getElementById("cancelbutton");
const txtNewTitle = document.getElementById("newtitle");
const txtNewAuthor = document.getElementById("newauthor");
const txtNewPages = document.getElementById("newpages");
const rdoNewRead = document.getElementById("newread");
const rdoNewNotRead = document.getElementById("newnotread");
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
    let title = txtNewTitle.value;
    let author = txtNewAuthor.value;
    let pages = txtNewPages.value;
    let read = rdoNewRead.checked;
    let book = new Book(title, author, pages, read);
    books.push(book); 
    generateBookList();
    resetAddDialog();
});

btnCancelNewBook.addEventListener("click", e => {
    e.preventDefault();
    // clear all form fields then hide the form
    resetAddDialog();
});

const resetAddDialog = function() {
    txtNewTitle.value = "";
    txtNewAuthor.value = "";
    txtNewPages.value = "";
    rdoNewRead.checked = false;
    rdoNewNotRead.checked = true;
    btnAdd.classList.remove("addmode");
    addBox.classList.remove("addmode");
}

const Book = function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.coverArt = "res/book-open-variant-outline.svg";
    this.coverArtAlt = "default cover"
};

Book.prototype.generateCardHTML = function(divIndex) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", divIndex);
    cardDiv.innerHTML = `
            <div class="cover"><img src="${this.coverArt}" alt="${this.coverArtAlt}" class="default"></div>
            <div>Title</div><div>${this.title}</div>
            <div>Author</div><div>${this.author}</div>
            <div>Pages</div><div>${this.pages}</div>
            <div class="readstatus">${this.read ? "Read" : "Not Read"}</div>
            <div class="buttons">
                <button class="toggleread ${divIndex}">Toggle Read</button>
                <button class="delete ${divIndex}">Delete</button>
            </div>
    `;
    return cardDiv;
};

var books = [];
// load some default books
books.push(new Book("The Adventures of Tom Sawyer", "Samuel Clemens", 432, true));
books.push(new Book("The Hobbit", "J.R.R. Tolkien", 1024, false));
books.push(new Book("The Road", "Cormack McCarthy", 837, true));

document.addEventListener("DOMContentLoaded", e => {
    generateBookList();
});

function generateBookList() {
    bookListDiv.innerHTML = "";
    if (books.length === 0) {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Your Library is empty. Please add a book.";
        bookListDiv.appendChild(errorMessage);
    } else {
        let index = 0;
        for (let book of books) {
            // add the card to the page
            bookListDiv.appendChild(book.generateCardHTML(`book${index}`));
            index++;
        }
        // set up button events
        let toggleButtons = document.querySelectorAll("button.toggleread");
        for (let toggleButton of toggleButtons) {
            toggleButton.addEventListener("click", e => {
                let buttonClasses = Array.from(e.target.classList);
                buttonClasses.splice(buttonClasses.indexOf("toggleread"),1);
                cardIndex = buttonClasses[0].slice(4);
                books[cardIndex].read = !books[cardIndex].read;
                generateBookList();
            });
        }

        let deleteButtons = document.querySelectorAll("button.delete");
        for (let deleteButton of deleteButtons) {
            deleteButton.addEventListener("click", e => {
                let buttonClasses = Array.from(e.target.classList);
                buttonClasses.splice(buttonClasses.indexOf("delete"),1);
                cardIndex = buttonClasses[0].slice(4);
                books.splice(cardIndex,1);
                generateBookList();
            });
        }
    }
}

