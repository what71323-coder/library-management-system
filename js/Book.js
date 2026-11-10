export class Book {
    constructor(id, title, author, category, isAvailable = true) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
        this.issuedTo = null;
    }

    // Display book information
    getBookInfo() {
        return `${this.title} by ${this.author}`;
    }

    // Check availability
    checkAvailability() {
        return this.isAvailable;
    }

    // Issue book
    issueBook(studentId) {
        if (!this.isAvailable) {
            return false;
        }

        this.isAvailable = false;
        this.issuedTo = studentId;
        return true;
    }

    // Return book
    returnBook() {
        if (this.isAvailable) {
            return false;
        }

        this.isAvailable = true;
        this.issuedTo = null;
        return true;
    }

    // Convert object into plain data for localStorage
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            category: this.category,
            isAvailable: this.isAvailable,
            issuedTo: this.issuedTo
        };
    }
}