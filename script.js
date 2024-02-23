const btnAdd = document.getElementById("btnAddBook");
const addBox = document.querySelector(".add");
const btnSubmitNewBook = document.getElementById("addbutton");
const btnCancelNewBook = document.getElementById("cancelbutton");
const txtNewTitle = document.getElementById("newtitle");
const txtNewAuthorLastName = document.getElementById("lastname");
const txtNewAuthorFirstName = document.getElementById("firstname");
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
    let lastName = txtNewAuthorLastName.value;
    let firstName = txtNewAuthorFirstName.value;
    let pages = txtNewPages.value;
    let read = rdoNewRead.checked;
    let book = new Book(title, lastName, firstName, pages, read);
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
    // hides the add a book dialog and blanks all fields
    txtNewTitle.value = "";
    txtNewAuthorFirstName.value = "";
    txtNewAuthorLastName.value = "";
    txtNewPages.value = "";
    rdoNewRead.checked = false;
    rdoNewNotRead.checked = true;
    btnAdd.classList.remove("addmode");
    addBox.classList.remove("addmode");
}

const Book = function(title, lastName, firstName, pages, read) {
    this.title = title;
    this.author = {
        firstName: firstName,
        lastName: lastName,
    }
    this.pages = pages;
    this.read = read;
    this.coverArt = "res/book-open-variant-outline.svg";
    this.coverArtAlt = "default cover"
};

Book.prototype.name = function() {
    // returns the string containing the author's full name, last name first.
    // returns only the last name if the first name does not exist.
    if (this.author.firstName) {
        return this.author.lastName + ", " + this.author.firstName;      
    } else {
        return this.author.lastName;
    }
};

Book.prototype.generateCardHTML = function(divIndex) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", divIndex);
    cardDiv.innerHTML = `
            <div class="cover"><img src="${this.coverArt}" alt="${this.coverArtAlt}" class="default"></div>
            <div>Title</div><div>${this.title}</div>
            <div>Author</div><div>${this.name()}</div>
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
books.push(new Book("The Adventures of Tom Sawyer", "Twain", "Mark", 192, true));
books.push(new Book("The Hobbit", "Tolkien", "J.R.R.", 300, true));
books.push(new Book("The Road", "McCarthy", "Cormack", 837, true));
books.push(new Book("Fahrenheit 451", "Bradbury", "Ray", 249, true));

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
        // sort by last name
        books.sort((a,b) => {
            let lastA = a.author.lastName;
            let lastB = b.author.lastName;
            return (lastA < lastB) ? -1 : 1;
        });

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
                // remove toggleread class. last remaining class will be 'bookxxx'
                buttonClasses.splice(buttonClasses.indexOf("toggleread"),1);
                // remove the 'book' part to leave the number
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

