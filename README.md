# 🏨 SmartStay — Full Stack Hotel Booking System

<div align="center">

![SmartStay Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=150&section=header&text=SmartStay&fontSize=50&fontColor=fff&animation=twinkling)

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-000000?style=for-the-badge)](https://smart-stay-full-stack.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)](https://smart-stay-full-stack.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)

</div>

---

## 📌 About

SmartStay is a full-stack hotel booking and management system where users can browse hotels, book rooms, and make secure payments — all in one place.

---

## ✨ Features

- 🔐 **Authentication** — Secure login/signup via Clerk
- 🏨 **Hotel Listings** — Browse and search available hotels
- 📅 **Room Booking** — Book rooms with check-in/check-out dates
- 💳 **Stripe Payments** — Secure online payment integration
- 🖼️ **Image Uploads** — Hotel images via Cloudinary
- 📧 **Email Notifications** — Booking confirmation via Nodemailer
- 👤 **User Dashboard** — View and manage your bookings
- 🛠️ **Admin Panel** — Manage hotels, rooms, and bookings

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

**Database & Services**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account
- Clerk account
- Cloudinary account

### Installation

```bash
# Clone the repo
git clone https://github.com/Reyaz18/SmartStay-FullStack.git

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create `.env` file in `/server`:

```env
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_key
```

### Run Locally

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm run dev
```

---

## 📁 Project Structure

```
SmartStay-FullStack/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Route pages
│   │   └── App.jsx
├── server/               # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── controllers/      # Business logic
│   └── index.js
```

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Images | Cloudinary |

---

## 👨‍💻 Author

**Priyanshu kumar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/reyazali99)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Reyaz18)

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=80&section=footer"/>
</div>
