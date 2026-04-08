# Bhariya Logistics Platform 🚚

Bhariya is a modern logistics platform designed to connect independent drivers with cargo owners. The system focuses on **proximity-based discovery**, ensuring drivers see only the cargo loads that are within a reasonable distance from their current location.

---

## ✨ Key Features

- **📍 Geospatial Cargo Discovery**: Uses MongoDB's `2dsphere` indexing to find cargo within a 10km radius of the driver.
- **📱 Real-time GPS Integration**: Mobile app uses `expo-location` to fetch precise driver coordinates.
- **🎯 Smart Filtering**: Automatically hides cargo that is too far away, optimizing the driver's job search.
- **⚡ Proximity Badging**: Every cargo card displays exactly how many kilometers away it is from the driver's current position.
- **✅ Instant Acceptance**: Simple one-tap flow for drivers to accept cargo loads.
- **🚀 Performance Optimized**: 
    - Uses `getLastKnownPositionAsync` for instant UI loading.
    - Background GPS updates provide fresh data without blocking the user.
    - Fast pull-to-refresh for cargo updates without redundant GPS lock-on.

---

## 🛠 Technology Stack

### Backend
- **Node.js & Express**: Core API framework.
- **MongoDB**: Used for high-performance geospatial queries via `$geoNear`.
- **Mongoose**: ODM for structured data modeling with GeoJSON support.

### Mobile
- **React Native (Expo)**: Cross-platform mobile development.
- **Expo Location**: For high-accuracy and battery-efficient GPS tracking.
- **Lucide Icons**: For a modern and clean UI aesthetic.
- **Axios**: Promised-based HTTP client for API communication.

---

## 🔄 System Flow & Architecture

The system follows a reactive request-response cycle driven by proximity:

1. **GPS Acquisition**: When the Driver opens the app, the mobile client requests GPS permissions and gets the current coordinates (Lat/Lng).
2. **API Request**: The app sends a `GET /api/loads` request with `lat` and `lng` query parameters.
3. **Geospatial Processing**:
    - The Backend calculates the distance between the Driver and all `PENDING` cargo using the Haversine formula (optimized within MongoDB).
    - It applies a `maxDistance: 10000` (10km) filter.
    - It computes a human-readable `distance` field for each result.
4. **Data Delivery**: The API returns a sorted list of the nearest relevant cargo.
5. **UI Rendering**: The mobile app displays the cargo cards, showing the "km away" badge for each.
6. **Cargo Acceptance**: When a driver clicks "Accept", the status updates in MongoDB, and the load is assigned to that driver's ID.

---

## 🚀 Setup & Installation

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. **Seed Database**
   Populate the database with 10 sample cargo loads (4 nearby Kathmandu, 6 in other regions):
   ```bash
   npm run seed
   ```

4. **Run Server**
   ```bash
   npm run dev
   ```

### Mobile Setup

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the `mobile/` folder:
   ```env
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:5000/api
   ```

3. **Run Mobile App**
   ```bash
   npx expo start
   ```

---

## 🧪 Seeding for Testing

The `npm run seed` command is configured to help you test the proximity logic instantly:
- **Nearby Matches**: 4 loads are seeded in Kathmandu, Lalitpur, Bhaktapur, and Kirtipur.
- **Distant Loads**: 6 loads are seeded in cities like Biratnagar, Pokhara, and Chitwan.
- **Result**: If your device/emulator location is set to Kathmandu, you will see exactly 4 cargo loads.
