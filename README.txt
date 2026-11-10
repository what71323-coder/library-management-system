LIBRARY MANAGEMENT SYSTEM

PROJECT DESCRIPTION
Library Management System is a JavaScript web application that
manages books and student book borrowing operations.

TECHNOLOGIES USED
1. HTML5
2. CSS3
3. JavaScript ES6+
4. JavaScript Classes
5. DOM Manipulation
6. localStorage

OOP CONCEPTS USED

1. CLASS
Book, User, Student, and Library classes are created.

2. OBJECTS
Book objects and Student objects are created using constructors.

3. CONSTRUCTOR
Constructors initialize object properties.

4. INHERITANCE
Student extends User and uses super() to call the parent constructor.

5. ENCAPSULATION
Private fields #books and #issuedBookIds protect internal data.

6. METHODS
Methods are used to add, remove, issue, return, and display books.

FEATURES
1. Add new books.
2. Display book collection dynamically.
3. Search books by title or author.
4. Filter books by category.
5. Issue available books.
6. Return issued books.
7. Maximum three books per student.
8. Display available and issued book counts.
9. Remove available books.
10. Store books and student information in localStorage.

BOOK ISSUE RULES
1. Students must register before issuing books.
2. A book cannot be issued if already issued.
3. A student can issue maximum three books.
4. Only the student who issued a book can return it.
5. Issued books cannot be removed.

HOW TO RUN
1. Open the project folder in VS Code.
2. Install the Live Server extension if required.
3. Open index.html using Live Server.
4. Register a student.
5. Add books or use the sample books.
6. Search, issue, return, and remove books.

IMPORTANT
JavaScript ES Modules are used.
Run the application using Live Server instead of directly
opening index.html with file://.

LOCAL STORAGE
Book data is stored using libraryBooks.
Student data is stored using libraryStudent.
Data remains available after refreshing the browser.

PROJECT STRUCTURE

library-management-system/
|-- index.html
|-- css/
|   |-- style.css
|-- js/
|   |-- Book.js
|   |-- User.js
|   |-- Library.js
|   |-- app.js

AUTHOR
Raj