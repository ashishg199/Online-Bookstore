Online Bookstore 📚

The Online Bookstore is a full-stack web application developed using the MERN stack. The project allows users to browse books, register/login, manage carts, place orders, and perform admin operations for book management.

🚀 Tech Stack
Frontend
React.js
Redux Toolkit
Axios
React Router DOM
CSS / Bootstrap
Backend
Node.js
Express.js
MongoDB
JWT Authentication
Mongoose
📂 Project Structure
Online-Bookstore/
│
├── frontend/       # React Frontend
├── backend/        # Node + Express Backend
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/ashishg199/Online-Bookstore.git
cd Online-Bookstore
📦 Install Dependencies
Backend Installation
cd backend
npm install
Frontend Installation
cd ../frontend
npm install
🔐 Environment Variables
already there.

Example:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/OnlineBookStore
▶️ Run Project
Start Backend Server
cd backend
npm run dev

Backend will run on:

http://localhost:5000
Start Frontend

Open another terminal:

cd frontend
npm run dev

Frontend will run on:

http://localhost:3000

✨ Features

👤 User Features
User Registration
User Login & Authentication
Browse Books
Search Books
Add to Cart
Place Orders
View Order History
Update Profile

🛠️ Admin Features
Admin Login
Add Books
Update Books
Delete Books
Manage Users
Manage Orders

📡 API Endpoints

🔐 Authentication APIs

Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
POST	/api/auth/admin-login	Admin Login

📚 Book APIs
Method	Endpoint	Description
GET	/api/books	Get All Books
GET	/api/books/:id	Get Single Book
POST	/api/books	Add New Book
PUT	/api/books/:id	Update Book
DELETE	/api/books/:id	Delete Book

🛒 Cart APIs
Method	Endpoint	Description
GET	/api/cart	Get Cart Items
POST	/api/cart/add	Add Item to Cart
DELETE	/api/cart/:id	Remove Cart Item

📦 Order APIs
Method	Endpoint	Description
POST	/api/orders	Place Order
GET	/api/orders/my-orders	Get User Orders
GET	/api/orders	Get All Orders (Admin)

👥 User APIs
Method	Endpoint	Description
GET	/api/users/profile	Get User Profile
PUT	/api/users/profile	Update User Profile
GET	/api/users	Get All Users


<img width="1224" height="687" alt="image" src="https://github.com/user-attachments/assets/15d6d901-a8e4-454f-b05b-cf6e547cc8ae" />
🧑‍💻 Author

Developed by Ashish Gupta

GitHub: ashishg199 GitHub Profile

📄 License

This project is licensed under the MIT License.
