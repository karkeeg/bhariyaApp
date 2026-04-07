# Bhariya Logistics Platform 

This project consists of a Node.js backend and a React Native (Expo) mobile application. 

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` folder (refer to `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
NODE_ENV=development
```

### 3. Seed Database
Run this command to populate the database with initial sample cargo loads:
```bash
npm run seed
```

### 4. Run Server
```bash
npm run dev
```

---

##  Mobile Setup

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `mobile/` folder (refer to `.env.example`):
```env
EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:5000/api
```

### 3. Run Mobile App
```bash
npx expo start
```
