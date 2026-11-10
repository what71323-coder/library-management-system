import { Book } from "./Book.js";
import { Student } from "./User.js";
import { Library } from "./Library.js";

// Create library object
const library = new Library();

// DOM Elements
const bookForm = document.getElementById("bookForm");
const studentForm = document.getElementById("studentForm");
const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");

const totalBooksElement = document.getElementById("totalBooks");
const availableBooksElement = document.getElementById("availableBooks");
const issuedBooksElement = document.getElementById("issuedBooks");
const studentInfoElement = document.getElementById("studentInfo");

// Current student
let currentStudent = null;

// Generate book ID
function generateBookId() {
    return "B" + Date.now();
}

// Save student information
function saveStudent() {
    if (!currentStudent) {
        localStorage.removeItem("libraryStudent");
        return;
    }

    localStorage.setItem(
        "libraryStudent",
        JSON.stringify(currentStudent.toJSON())
    );
}

// Load student information
function loadStudent() {
    try {
        const savedStudent = localStorage.getItem("libraryStudent");

        if (savedStudent) {
            const data = JSON.parse(savedStudent);

            currentStudent = new Student(
                data.userId,
                data.name,
                data.email
            );

            currentStudent.restoreIssuedBooks(
                data.issuedBookIds || []
            );

            displayStudent();
        }
    } catch (error) {
        console.error("Unable to load student:", error);
    }
}

// Display student information
function displayStudent() {
    if (!currentStudent) {
        studentInfoElement.textContent =
            "Please register a student to issue books.";
        return;
    }

    studentInfoElement.textContent =
        `${currentStudent.displayStudentInfo()} | ` +
        `Issued: ${currentStudent.getIssuedBookCount()}/3`;
}

// Show notification
function showMessage(text, type = "success") {
    message.textContent = text;
    message.className = type;

    // Clear previous message after a short time
    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 4000);
}

// Create initial sample books
function createSampleBooks() {
    if (library.getTotalBooks() > 0) {
        return;
    }

    const sampleBooks = [
        new Book("B101", "JavaScript Basics", "John Smith", "Programming"),
        new Book("B102", "HTML and CSS", "David Miller", "Web Development"),
        new Book("B103", "PHP Programming", "Alex Brown", "Programming"),
        new Book("B104", "Database Systems", "Mark Wilson", "Database"),
        new Book("B105", "Computer Networks", "James Clark", "Networking")
    ];

    sampleBooks.forEach(book => library.addBook(book));
}

// Update statistics
function updateStatistics() {
    totalBooksElement.textContent = library.getTotalBooks();
    availableBooksElement.textContent = library.getAvailableBooks();
    issuedBooksElement.textContent = library.getIssuedBooks();
}

// Display books dynamically
function displayBooks() {
    bookContainer.replaceChildren();

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = library.getAllBooks().filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    emptyMessage.hidden = filteredBooks.length !== 0;

    filteredBooks.forEach(book => {
        const bookCard = document.createElement("article");
        bookCard.className = "book-card";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const category = document.createElement("p");
        category.textContent = `Category: ${book.category}`;

        const status = document.createElement("span");
        status.className = book.isAvailable ? "available" : "issued";
        status.textContent = book.isAvailable
            ? "Available"
            : "Issued";

        const actions = document.createElement("div");
        actions.className = "book-actions";

        const actionButton = document.createElement("button");

        if (book.isAvailable) {
            actionButton.textContent = "Issue Book";
            actionButton.className = "issue-button";
            actionButton.addEventListener("click", () => {
                handleIssueBook(book.id);
            });
        } else {
            actionButton.textContent = "Return Book";
            actionButton.className = "return-button";
            actionButton.addEventListener("click", () => {
                handleReturnBook(book.id);
            });
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", () => {
            handleRemoveBook(book.id);
        });

        actions.append(actionButton, removeButton);

        bookCard.append(
            title,
            author,
            category,
            status,
            actions
        );

        bookContainer.appendChild(bookCard);
    });

    updateStatistics();
}

// Register student
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (!name || !email) {
        showMessage("Please enter student details.", "error");
        return;
    }

    if (currentStudent && currentStudent.getIssuedBookCount() > 0) {
        showMessage(
            "Return your issued books before changing student.",
            "error"
        );
        return;
    }

    currentStudent = new Student(
        "S" + Date.now(),
        name,
        email
    );

    saveStudent();
    displayStudent();

    studentForm.reset();

    showMessage("Student registered successfully!");
});

// Add book
bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const category = document.getElementById("bookCategory").value;

    if (!title || !author || !category) {
        showMessage("Please fill in all book details.", "error");
        return;
    }

    try {
        const book = new Book(
            generateBookId(),
            title,
            author,
            category,
            true
        );

        library.addBook(book);

        bookForm.reset();
        displayBooks();

        showMessage("Book added successfully!");
    } catch (error) {
        showMessage(error.message, "error");
    }
});

// Issue book
function handleIssueBook(bookId) {
    if (!currentStudent) {
        showMessage("Please register a student first.", "error");
        return;
    }

    try {
        library.issueBook(bookId, currentStudent);

        saveStudent();
        displayStudent();
        displayBooks();

        showMessage("Book issued successfully!");
    } catch (error) {
        showMessage(error.message, "error");
    }
}

// Return book
function handleReturnBook(bookId) {
    if (!currentStudent) {
        showMessage("Please register a student first.", "error");
        return;
    }

    try {
        library.returnBook(bookId, currentStudent);

        saveStudent();
        displayStudent();
        displayBooks();

        showMessage("Book returned successfully!");
    } catch (error) {
        showMessage(error.message, "error");
    }
}

// Remove book
function handleRemoveBook(bookId) {
    try {
        library.removeBook(bookId);

        displayBooks();
        showMessage("Book removed successfully!");
    } catch (error) {
        showMessage(error.message, "error");
    }
}

// Search event
searchInput.addEventListener("input", displayBooks);

// Category filter event
categoryFilter.addEventListener("change", displayBooks);

// Initialize application
loadStudent();
createSampleBooks();
displayBooks();