const btnAdd = document.getElementById("btnAddBook");
const addBox = document.querySelector(".add");
const btnSubmitNewBook = document.getElementById("addbutton");
const btnCancelNewBook = document.getElementById("cancelbutton");
const txtNewTitle = document.getElementById("newtitle");
const txtNewAuthor = document.getElementById("newauthor");
const txtNewPages = document.getElementById("newpages");
const rdoNewRead = document.getElementById("newread");

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