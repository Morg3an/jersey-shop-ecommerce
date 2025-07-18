# Jersey Shop

An e-commerce web application for ordering customized jerseys. Built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🛍️ Features

### 🧑‍💻 User

* Register & login via email/password
* Browse available jersey products
* Add products to cart with customization:

  * Name on shirt
  * Shirt number
  * Color choice
* Checkout and place orders
* View past orders

### 🔧 Admin

* Admin dashboard to manage:

  * Products (CRUD)
  * Orders (CRUD)
  * Users (delete only)
* Admins can mark orders as fulfilled

---

## 🧱 Tech Stack

### Frontend:

* React
* Vite
* React Router
* Context API
* Axios
* TailwindCSS

### Backend:

* Node.js
* Express
* MongoDB + Mongoose
* JWT Auth

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Morg3an/jersey-shop.git
cd jersey-shop
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
```

### 3. Create `.env` files

**Backend (.env):**

```
PORT=5000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
```

**Frontend (.env):**

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the app

#### Backend:

```bash
npm run dev
```

#### Frontend:

```bash
cd client
npm run dev
```

---

## 📂 Project Structure

```
jersey-shop/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── services/
├── server/               # Node backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
```

---

## ✨ Credits

* Built by [Morg3an](https://github.com/Morg3an)
* Logo and jersey designs by \[Your Designer]

---

## 📜 License

MIT License