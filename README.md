# Shoppy - E-commerce Application

A modern, responsive e-commerce web application built with React, Redux, and Firebase. Shop for various products with a seamless user experience featuring cart management, user authentication, and order tracking.

## 🚀 Features

### Core Features
- **Product Catalog**: Browse products with categories and detailed product pages
- **Search Functionality**: Search products by name or category
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **User Authentication**: Sign up, login, and profile management
- **Order Management**: Place orders and track order history
- **Responsive Design**: Mobile-first design with Bootstrap integration

### User Features
- **Guest Shopping**: Shop without registration with local storage cart
- **User Profiles**: Manage personal information and addresses
- **Order Tracking**: View order history and cancel orders
- **Product Categories**: Browse products by categories with carousel display
- **Product Search**: Real-time search with results page
- **Payment Options**: Cash on Delivery (COD) and Online Payment support

### Technical Features
- **State Management**: Redux Toolkit for efficient state handling
- **Data Persistence**: Firebase Realtime Database integration
- **Lazy Loading**: Code splitting with React.lazy for better performance
- **Responsive UI**: Bootstrap components with custom styling
- **Image Optimization**: Lazy loading images with zoom functionality

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, React Router DOM
- **State Management**: Redux Toolkit, React Redux
- **UI Framework**: Bootstrap 5.3.6, React Bootstrap
- **HTTP Client**: Axios
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Icons**: Bootstrap Icons, React Icons
- **Carousel**: Swiper.js
- **Build Tool**: Vite
- **Styling**: CSS Modules, Bootstrap

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajayygurjar/Shoppy_User
   cd shoppy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_firebase_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Realtime Database
3. Copy your Firebase API key to the `.env` file
4. Configure Firebase Realtime Database rules for your application


## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   ├── Cart/              # Shopping cart components
│   ├── Category/          # Category-related components
│   ├── Home/              # Home page components
│   ├── Layout/            # Layout components (Header, Footer)
│   ├── Pages/             # Static pages (About, Orders, Search)
│   └── Product/           # Product-related components
├── hooks/                 # Custom React hooks
├── store/                 # Redux store and slices
├── App.jsx               # Main App component
└── main.jsx              # Application entry point
```

## 🎯 Usage

### For Users
1. **Browse Products**: Visit the home page to see featured products and categories
2. **Search**: Use the search bar to find specific products
3. **Shopping**: Add products to cart and proceed to checkout
4. **Account**: Create an account for order tracking and profile management
5. **Orders**: View order history and manage orders from the Orders page

### For Developers
1. **Adding Products**: Add products to Firebase Realtime Database under `/products`
2. **Categories**: Manage categories under `/categories`
3. **Styling**: Customize styles in component CSS files and CSS modules
4. **State Management**: Use Redux slices for state management
5. **API Integration**: Extend API calls in component files and custom hooks

## 🔐 Authentication

The application uses Firebase Authentication with the following features:
- Email/Password authentication
- User session persistence
- Profile management
- Protected routes for authenticated users

## 🛒 Cart Management

- **Guest Users**: Cart data stored in localStorage
- **Authenticated Users**: Cart data synced with Firebase
- **Persistence**: Cart state maintained across browser sessions
- **Real-time Updates**: Automatic cart calculations and updates

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Bootstrap breakpoints
- Optimized for all screen sizes
- Touch-friendly interface

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap team for the UI components
- Firebase team for the backend services
- Swiper.js for the carousel functionality

## 📞 Support

For support, email ajay1651@gmail.com or create an issue in the repository.

---

**Built with ❤️ using React and Firebase**