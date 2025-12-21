# Lumora Frontend

A modern, responsive React application for the Lumora decoration services platform. Built with React, Vite, and Tailwind CSS, featuring a beautiful UI with smooth animations and seamless user experience.

## 🚀 Features

- **User Authentication**
  - Firebase Authentication integration
  - Google Sign-In support
  - JWT token management
  - Protected routes

- **Service Discovery**
  - Browse decoration services
  - Service details with images
  - Category filtering
  - Search functionality
  - Service coverage map

- **Booking System**
  - Create bookings
  - View booking history
  - Booking management
  - Status tracking

- **Payment Integration**
  - Stripe Checkout integration
  - Secure payment processing
  - Payment success/cancel pages
  - Payment history

- **Dashboard**
  - User Dashboard
  - Admin Dashboard (analytics, service management)
  - Decorator Dashboard (projects, earnings, schedule)

- **UI/UX**
  - Responsive design (mobile-first)
  - Smooth animations (Framer Motion)
  - Loading states and skeletons
  - Toast notifications
  - Modern gradient designs

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Authentication**: Firebase Auth
- **Maps**: React Leaflet
- **Charts**: Recharts
- **Payment**: Stripe.js
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## 📋 Prerequisites

- Node.js >= 18.x
- npm or yarn
- Firebase project (for authentication)
- Backend API running (or deployed)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── _redirects          # Vercel SPA routing configuration
│   └── vite.svg
├── src/
│   ├── assets/             # Static assets (images, icons)
│   ├── components/         # Reusable components
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Navbar.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx  # Authentication context
│   ├── layouts/            # Layout components
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/              # Page components
│   │   ├── dashboard/      # Dashboard pages
│   │   │   ├── admin/      # Admin pages
│   │   │   ├── decorator/  # Decorator pages
│   │   │   └── user/       # User pages
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── PaymentCancel.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── Register.jsx
│   │   ├── ServiceCoverageMap.jsx
│   │   ├── ServiceDetails.jsx
│   │   └── Services.jsx
│   ├── routes/             # Route configuration
│   │   ├── AdminRoute.jsx
│   │   ├── DecoratorRoute.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Routes.jsx
│   ├── utilits/            # Utilities
│   │   ├── axiosInstance.js # Axios configuration
│   │   └── firebase.config.js
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🎨 Key Features

### Authentication Flow
1. User signs up/logs in via Firebase
2. JWT token is generated and stored in localStorage
3. Token is included in all API requests
4. Protected routes check authentication status

### Payment Flow
1. User creates a booking
2. User clicks "Pay Now"
3. Stripe Checkout session is created
4. User completes payment on Stripe
5. Redirected to success page
6. Payment is verified and booking updated

### Role-Based Access
- **User**: Can book services, view bookings, make payments
- **Decorator**: Can view assigned projects, update status, view earnings
- **Admin**: Full access to manage services, bookings, users, and analytics

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in Vercel Dashboard

2. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Root Directory: `frontend` (if monorepo)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file:
     ```
     VITE_API_URL=https://your-backend.vercel.app
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     ```

4. **Deploy**
   - Vercel will automatically deploy on push
   - Or manually trigger deployment from dashboard

### Important: SPA Routing Configuration

The `vercel.json` file is configured to handle React Router routes:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes (like `/payment/success`) are handled by React Router.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses Tailwind CSS with DaisyUI components:

- **Tailwind CSS 4**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **Custom CSS**: Additional styles in `index.css`

### Theme Configuration
DaisyUI themes can be configured in `tailwind.config.js` (if exists) or via data attributes.

## 🔌 API Integration

All API calls are made through `axiosInstance.js` which:
- Sets base URL from `VITE_API_URL`
- Automatically adds JWT token to requests
- Handles common errors
- Provides request/response interceptors

### Example API Call
```javascript
import axios from '../utilits/axiosInstance';

const fetchServices = async () => {
  const { data } = await axios.get('/api/services');
  return data;
};
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Yes |

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the browser.

## 🐛 Troubleshooting

### Build Errors
- Ensure Node.js version >= 18.x
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors if using TypeScript

### Routing Issues (404 on Refresh)
- Verify `vercel.json` exists and is configured correctly
- Ensure `_redirects` file is in `public/` directory
- Check that routes are properly defined in `Routes.jsx`

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration on backend
- Ensure backend is running and accessible

### Firebase Authentication Issues
- Verify all Firebase environment variables are set
- Check Firebase project configuration
- Ensure Firebase Authentication is enabled in Firebase Console

### Payment Issues
- Verify Stripe keys are configured on backend
- Check `CLIENT_URL` matches frontend URL
- Ensure webhook is configured correctly

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- API keys exposed in environment variables (use Vercel environment variables)
- CORS configured on backend
- Input validation on forms
- XSS protection via React's built-in escaping

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For issues and questions, please contact the development team.

---

**Built with ❤️ for Lumora**
