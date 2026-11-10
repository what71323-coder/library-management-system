
import { Book } from "./Book.js";

export class Library {
    #books = [];

    constructor() {
        this.loadBooks();
    }

    // Load books from localStorage
    loadBooks() {
        try {
            const savedBooks = localStorage.getItem("libraryBooks");

            if (savedBooks) {
                const bookData = JSON.parse(savedBooks);

                this.#books = bookData.map(data => {
                    const book = new Book(
                        data.id,
                        data.title,
                        data.author,
                        data.category,
                        data.isAvailable
                    );

                    book.issuedTo = data.issuedTo;
                    return book;
                });
            }
        } catch (error) {
            console.error("Unable to load books:", error);
            this.#books = [];
        }
    }

    // Save books to localStorage
    saveBooks() {
        localStorage.setItem(
            "libraryBooks",
            JSON.stringify(this.#books)
        );
    }

    // Add new book
    addBook(book) {
        if (this.findBook(book.id)) {
            throw new Error("Book ID already exists.");
        }

        this.#books.push(book);
        this.saveBooks();
    }

    // Find book by ID
    findBook(bookId) {
        return this.#books.find(book => book.id === bookId);
    }

    // Remove book by ID
    removeBook(bookId) {
        const book = this.findBook(bookId);

        if (!book) {
            return false;
        }

        if (!book.isAvailable) {
            throw new Error("Issued books cannot be removed.");
        }

        this.#books = this.#books.filter(
            item => item.id !== bookId
        );

        this.saveBooks();
        return true;
    }

    // Return all books safely
    getAllBooks() {
        return [...this.#books];
    }

    // Issue book
    issueBook(bookId, student) {
        const book = this.findBook(bookId);

        if (!book) {
            throw new Error("Book not found.");
        }

        if (!book.checkAvailability()) {
            throw new Error("This book is already issued.");
        }

        if (!student.canIssueBook()) {
            throw new Error("Maximum limit of 3 books reached.");
        }

        book.issueBook(student.userId);
        student.addIssuedBook(bookId);

        this.saveBooks();
        return book;
    }

    // Return book
    returnBook(bookId, student) {
        const book = this.findBook(bookId);

        if (!book) {
            throw new Error("Book not found.");
        }

        if (book.isAvailable) {
            throw new Error("This book is already available.");
        }

        if (book.issuedTo !== student.userId) {
            throw new Error("This book was not issued to this student.");
        }

        book.returnBook();
        student.removeIssuedBook(bookId);

        this.saveBooks();
        return book;
    }

    // Statistics
    getTotalBooks() {
        return this.#books.length;
    }

    getAvailableBooks() {
        return this.#books.filter(book => book.isAvailable).length;
    }

    getIssuedBooks() {
        return this.#books.filter(book => !book.isAvailable).length;
    }
}