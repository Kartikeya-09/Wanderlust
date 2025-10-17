# 🌍 Wanderlust

A full-stack web application for discovering and sharing travel destinations. Wanderlust allows users to explore unique places, share their favorite locations, and connect with fellow travel enthusiasts.

## ✨ Features

- **User Authentication**: Secure signup/login system using Passport.js with local strategy
- **Listing Management**: Create, read, update, and delete travel destination listings
- **Reviews & Ratings**: Add reviews and ratings to listings
- **Image Upload**: Upload images using Cloudinary integration
- **Interactive Maps**: Location mapping powered by Mapbox
- **Category Filtering**: Browse listings by different categories
- **Session Management**: Persistent user sessions with MongoDB store
- **Flash Messages**: User-friendly feedback notifications
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- **Node.js** (v23.4.0)
- **Express.js** - Web application framework
- **MongoDB** - Database with Mongoose ODM
- **Passport.js** - Authentication middleware

### Frontend
- **EJS** - Template engine with EJS Mate for layouts
- **CSS** - Custom styling
- **JavaScript** - Client-side interactivity

### Cloud Services
- **Cloudinary** - Image storage and management
- **Mapbox SDK** - Maps and geolocation
- **MongoDB Atlas** - Cloud database hosting

## 📦 Dependencies

```json
{
  "@mapbox/mapbox-sdk": "^0.16.1",
  "cloudinary": "^1.21.0",
  "connect-flash": "^0.1.1",
  "connect-mongo": "^5.1.0",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^4.19.2",
  "express-session": "^1.18.0",
  "joi": "^17.13.3",
  "method-override": "^3.0.0",
  "mongoose": "^8.4.4",
  "multer": "^1.4.5-lts.1",
  "multer-storage-cloudinary": "^4.0.0",
  "passport": "^0.7.0",
  "passport-local": "^1.0.0",
  "passport-local-mongoose": "^8.0.0"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v23.4.0)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Kartikeya-09/Wanderlust.git
cd Wanderlust
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:
```env
NODE_ENV=development
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_token
```

4. Initialize the database (optional - if you have seed data)
```bash
node init/index.js
```

5. Start the server
```bash
node app.js
```

6. Open your browser and navigate to
```
http://localhost:8080
```

## 📁 Project Structure

```
Wanderlust/
├── controllers/        # Route controllers
├── models/            # Mongoose models
│   ├── listing.js     # Listing schema
│   ├── review.js      # Review schema
│   └── user.js        # User schema
├── routes/            # Express routes
│   ├── listing.js     # Listing routes
│   ├── review.js      # Review routes
│   ├── category.js    # Category routes
│   └── user.js        # User authentication routes
├── views/             # EJS templates
├── public/            # Static files (CSS, JS, images)
├── utills/            # Utility functions
├── init/              # Database initialization
├── middleware.js      # Custom middleware
├── schema.js          # Joi validation schemas
├── cloudConfig.js     # Cloudinary configuration
├── app.js             # Main application file
└── package.json       # Project metadata
```

## 🔐 Authentication

The application uses Passport.js with a local authentication strategy:
- Users can sign up with username and password
- Passwords are hashed and securely stored
- Sessions are maintained using express-session with MongoDB store
- Session cookies expire after 7 days

## 🗺️ Key Features Implementation

### Listings
- Full CRUD operations for travel destinations
- Image upload with Cloudinary
- Location data with Mapbox integration
- Category-based organization

### Reviews
- Users can add reviews to listings
- Rating system
- Review validation using Joi

### Middleware
- Authentication checks
- Authorization for owner-only operations
- Input validation
- Error handling

## 🛡️ Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- HTTP-only cookies
- Environment variable protection
- Input validation with Joi

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👤 Author

**Kartikeya-09**
- GitHub: [@Kartikeya-09](https://github.com/Kartikeya-09)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

**Note**: Make sure to set up all environment variables before running the application. Never commit your `.env` file to version control.
```
