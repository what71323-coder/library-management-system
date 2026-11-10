export class User {
    constructor(userId, name, email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    getUserInfo() {
        return `${this.name} (${this.email})`;
    }
}

// Student inherits from User
export class Student extends User {
    #issuedBookIds = [];

    constructor(userId, name, email) {
        super(userId, name, email);
    }

    // Display student information
    displayStudentInfo() {
        return `Student: ${this.name} | ID: ${this.userId}`;
    }

    // Check maximum issue limit
    canIssueBook() {
        return this.#issuedBookIds.length < 3;
    }

    // Add issued book ID
    addIssuedBook(bookId) {
        if (!this.canIssueBook()) {
            return false;
        }

        this.#issuedBookIds.push(bookId);
        return true;
    }

    // Remove returned book ID
    removeIssuedBook(bookId) {
        this.#issuedBookIds = this.#issuedBookIds.filter(
            id => id !== bookId
        );
    }

    // Public access to issued books
    getIssuedBooks() {
        return [...this.#issuedBookIds];
    }

    // Restore issued books from saved data
    restoreIssuedBooks(bookIds) {
        this.#issuedBookIds = bookIds.slice(0, 3);
    }

    getIssuedBookCount() {
        return this.#issuedBookIds.length;
    }

    toJSON() {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            issuedBookIds: this.#issuedBookIds
        };
    }
}