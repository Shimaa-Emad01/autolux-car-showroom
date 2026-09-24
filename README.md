# 🚗 AutoLux — Car Showroom SPA

AutoLux is a modern and responsive **Car Showroom Single Page Application (SPA)** built with **Vue 3**.

The project provides a complete car browsing experience with related **Cars & Brands**, an **Admin Dashboard** for managing data, a mock REST API using **JSON Server**, global state management using **Pinia**, and an **AI-powered chatbot** for answering questions about cars and brands.

---

## ✨ Features

### 🌐 Public Website

* 🏠 Home page with hero section and featured cars
* 🚗 Browse all cars
* 🔎 Search and filter cars
* 🏷️ Browse car brands
* 📄 Car details page
* 🏷️ Brand details page
* 🔗 Related cars and brands
* 💰 Discounted prices
* 📦 Stock management
* 🛒 Buy Now functionality
* 🤖 AI chatbot for cars and brands
* 📱 Responsive design

### 🔐 Admin Dashboard

* 📊 Dashboard overview
* 🚗 Manage cars
* ➕ Add new cars
* ✏️ Edit existing cars
* 🗑️ Delete cars
* 🏷️ Manage brands
* ➕ Add new brands
* ✏️ Edit existing brands
* 🗑️ Delete brands
* 🔒 Protected admin routes

### ⚙️ Technical Features

* Vue 3 Composition API
* `<script setup>`
* Vue Router
* Pinia State Management
* JSON Server REST API
* Fetch API
* Reusable Vue components
* Props and Emits
* Composables
* Form validation
* Loading states
* Error states
* Empty states
* Toast notifications
* Responsive Bootstrap UI
* AI integration

---

## 🛠️ Tech Stack

| Technology  | Purpose                    |
| ----------- | -------------------------- |
| Vue 3       | Frontend framework         |
| Vite        | Development and build tool |
| Vue Router  | SPA routing                |
| Pinia       | State management           |
| Bootstrap   | Responsive UI              |
| JSON Server | Mock REST API              |
| Fetch API   | API requests               |
| Node.js     | AI backend                 |
| AI API      | AI chatbot                 |

---

## 📁 Project Structure

```text
src/
│
├── api/
│   └── carsApi.js
│
├── components/
│   ├── Navbar.vue
│   ├── Footer.vue
│   ├── CarCard.vue
│   ├── BrandCard.vue
│   ├── CarHero.vue
│   ├── LoadingSpinner.vue
│   ├── EmptyState.vue
│   ├── Toast.vue
│   └── AiChatWidget.vue
│
├── composables/
│   └── useToast.js
│
├── router/
│   └── index.js
│
├── stores/
│   ├── carsStore.js
│   ├── brandsStore.js
│   └── authStore.js
│
├── views/
│   ├── Home.vue
│   ├── About.vue
│   ├── Cars.vue
│   ├── CarDetails.vue
│   ├── Brands.vue
│   ├── BrandDetails.vue
│   └── admin/
│
├── App.vue
├── main.js
└── style.css
```

---

## 🔗 Main Routes

### Public Routes

```text
/
```

Home page.

```text
/about
```

About page.

```text
/cars
```

Cars catalogue with search and filtering.

```text
/cars/:id
```

Car details with related cars and AI chatbot.

```text
/brands
```

Brands catalogue.

```text
/brands/:id
```

Brand details with related cars and AI chatbot.

### Admin Routes

```text
/admin
```

Admin dashboard.

```text
/admin/cars
```

Cars management.

```text
/admin/brands
```

Brands management.

---

## 🔌 API

The project uses **JSON Server** as a mock REST API.

Default API URL:

```text
http://localhost:3000
```

Example endpoints:

```text
GET    /cars
GET    /cars/:id
POST   /cars
PUT    /cars/:id
DELETE /cars/:id

GET    /brands
GET    /brands/:id
POST   /brands
PUT    /brands/:id
DELETE /brands/:id
```

---

## 🤖 AI Chatbot

AutoLux includes an AI-powered chatbot that appears on car and brand details pages.

Users can ask questions about the currently displayed car or brand.

Examples:

```text
What is the price of this car?

Is this car currently in stock?

What discount does this car have?

Tell me more about this brand.
```

The AI service runs separately from the Vue frontend.

Example:

```text
http://localhost:3001
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/autolux-car-showroom.git
```

### 2. Open the project

```bash
cd autolux-car-showroom
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start JSON Server

```bash
npx json-server db.json --port 3000
```

### 5. Start the Vue development server

Open another terminal:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### 6. Start the AI server

If the AI server is included in the project:

```bash
node server/ai-server.cjs
```

The AI server runs on:

```text
http://localhost:3001
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=YOUR_API_KEY
OPENAI_MODEL=YOUR_MODEL
```

**Never commit your real API key to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## 🎯 Project Goals

The project was created to practice and demonstrate:

* Vue 3 fundamentals
* Component-based architecture
* SPA navigation
* Dynamic routes
* Global state management
* REST API integration
* CRUD operations
* Form validation
* Reusable components
* Responsive UI design
* AI integration

---

## 👩‍💻 Author

**Shaimaa Emad**

Information Systems Student
Faculty of Computers & Informatics — Tanta University

---

## 📌 Project Status

**Completed ✅**

Built as a Vue 3 training/final project.
