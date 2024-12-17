# README - Travel Agency Booking System Backend

## Project Overview
This project serves as the **backend implementation** for a Travel Agency Booking System. Due to my ongoing **exams**, I have focused on completing the backend portion, and it is fully functional. The APIs are ready to be tested using **Postman** or any other API testing tool. Most of this project's APIs were implemented with the help of **ChatGPT**, showcasing my ability to leverage AI tools effectively. This also highlights that I am open to opportunities in **Prompt Engineering**, as I can efficiently utilize AI to solve technical problems and deliver functional solutions.

---

## Tech Stack
- **Node.js** - Backend server
- **Express.js** - Web framework
- **MongoDB** - Database for data storage
- **Mongoose** - ODM library for MongoDB
- **JWT** - Authentication (Token-based)
- **Express-Session** - Session management
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **bcrypt** - Password hashing
- **morgan** - Logging

---

## Project Setup Instructions
To test the backend:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Set up a `.env` file in the project root and add the following:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret Key>
   SESSION_SECRET=<Your Session Secret Key>
   ```
   - Replace placeholders with appropriate values.

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

---

## API Endpoints
Below are the available API endpoints grouped by functionality.

### **User Authentication**
| Method | Endpoint           | Description            | Request Body                                |
|--------|--------------------|------------------------|--------------------------------------------|
| POST   | `/users/signup`    | User sign-up           | `{ name, email, password, phoneNumber }`   |
| POST   | `/users/signin`    | User sign-in           | `{ email, password }`                      |

#### Example:
- Sign-Up:
  ```http
  POST http://localhost:5000/users/signup
  Content-Type: application/json

  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "1234567890"
  }
  ```
- Sign-In:
  ```http
  POST http://localhost:5000/users/signin
  Content-Type: application/json

  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
---

### **Tour Packages**
| Method | Endpoint               | Description                    | Request Body                        |
|--------|------------------------|--------------------------------|------------------------------------|
| GET    | `/packages`            | Retrieve all tour packages     | None                               |
| GET    | `/packages/:id`        | Retrieve a specific package    | None                               |
| POST   | `/packages`            | Create a new package (Admin)   | `{ title, description, price, ... }` |
| PUT    | `/packages/:id`        | Update a package (Admin)       | `{ title, description, price, ... }` |
| DELETE | `/packages/:id`        | Delete a package (Admin)       | None                               |

#### Example:
- Get All Packages:
  ```http
  GET http://localhost:5000/packages
  Authorization: Bearer <JWT_TOKEN>
  ```
- Create Package (Admin):
  ```http
  POST http://localhost:5000/packages
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
    "title": "Hawaii Getaway",
    "description": "7-day luxury trip to Hawaii",
    "price": 1200,
    "availableDates": ["2024-01-01", "2024-02-01"]
  }
  ```

---

### **Booking Management**
| Method | Endpoint        | Description                  | Request Body                                |
|--------|-----------------|------------------------------|--------------------------------------------|
| POST   | `/bookings`     | Create a new booking         | `{ packageId, customerDetails, travelers }` |
| GET    | `/bookings`     | Retrieve all bookings (Admin)| None                                       |

#### Example:
- Create Booking:
  ```http
  POST http://localhost:5000/bookings
  Content-Type: application/json

  {
    "packageId": "65a4c8b5f58f3d12c8e72b01",
    "customerDetails": {
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "1234567890"
    },
    "travelers": 2
  }
  ```

---

### **Admin Routes**
| Method | Endpoint                | Description                | Request Body                        |
|--------|-------------------------|----------------------------|------------------------------------|
| POST   | `/admin/login`          | Admin login                | `{ email, password }`              |
| POST   | `/admin/packages`       | Add a new tour package     | `{ title, description, price }`    |
| PUT    | `/admin/packages/:id`   | Update an existing package | `{ title, description, price }`    |
| DELETE | `/admin/packages/:id`   | Delete a package           | None                               |

#### Example:
- Admin Login:
  ```http
  POST http://localhost:5000/admin/login
  Content-Type: application/json

  {
    "email": "admin@example.com",
    "password": "adminpassword"
  }
  ```

---

## Authentication Notes
- JWT Authentication is implemented for protected routes.
- Admin routes require a **valid JWT token** sent in the `Authorization` header.

Example Authorization Header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Testing the APIs
To test the APIs:
1. **Start the server** (`npm start`).
2. Use **Postman** or any API testing tool.
3. Test the endpoints listed above.

---

## Notes
- The backend is **completed and functional**.
- API testing can be performed independently.
- The frontend integration can be done at a later stage.
- This project demonstrates my ability to build functional backend systems and effectively collaborate with AI tools like **ChatGPT**.

Thank you for your understanding! Feel free to reach out if you have any questions regarding the backend implementation.

---

**Author**: Parth Ravindra Gaikwad  
**Contact**: parthgaikwad5409@.com

