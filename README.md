**MERN Stack Online Book Store App**

Full functional full-stack app with robust user interface. Inventory management system and serving as the bridge between the front end and the database. Built for scalability and reliability, it handles user authentication, CRUD operations, and book management.

**Features:**
Inventory Management System: Full CRUD support for books, including upload, edit, and delete functionalities.
Robust API: Designed to handle requests efficiently and ensure smooth communication with the front end.
Secure Authentication: Seamlessly integrated with Firebase for user authentication.
Scalable Architecture: Optimized with Express.js and MongoDB for efficient data handling and high performance.

**Technologies Used:**
Express.js for creating RESTful APIs.
MongoDB as the database to store and manage book inventory.
Nodemon for efficient development workflow with live server updates.
CORS setup to securely handle cross-origin requests.
Vercel Deployment for reliable and scalable hosting.


API Endpoints:
POST /api/upload-book: Upload a new book to the inventory.
GET /api/all-books: Retrieve all books or filter by category.
GET /api/book/:id: Fetch a single book's details by ID.
PATCH /api/book/:id: Update book details.
DELETE /api/book/:id: Delete a book from the inventory.
