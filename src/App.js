import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Copyrights from './components/Copyrights';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HostSignup from './pages/HostSignup';
import HostDashboard from './pages/HostDashboard';
import GuestDashboard from './pages/GuestDashboard';
import HostReservations from './pages/HostReservations';
import GuestReservations from './pages/GuestReservations';
import HostListings from './pages/HostListings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import DebugLocations from './components/DebugLocations';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
          {/* <Header /> */}

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/debug" element={<DebugLocations />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:id" element={<LocationDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/host-signup" element={<HostSignup />} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="host"><HostDashboard /></ProtectedRoute>} />
              <Route path="/admin/reservations" element={<ProtectedRoute requiredRole="host"><HostReservations /></ProtectedRoute>} />
              <Route path="/admin/listings" element={<ProtectedRoute requiredRole="host"><HostListings /></ProtectedRoute>} />
              <Route path="/admin/create-listing" element={<ProtectedRoute requiredRole="host"><CreateListing /></ProtectedRoute>} />
              <Route path="/admin/edit-listing/:id" element={<ProtectedRoute requiredRole="host"><EditListing /></ProtectedRoute>} />
              <Route path="/guest" element={<ProtectedRoute requiredRole="guest"><GuestDashboard /></ProtectedRoute>} />
              <Route path="/guest/reservations" element={<ProtectedRoute requiredRole="guest"><GuestReservations /></ProtectedRoute>} />
              {/* <Route path="/inspiration" element={<Inspiration />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/giftCards" element={<GiftCards />} />
              <Route path="/questions" element={<QuestionsBanner />} />
              <Route path="/future-getaways" element={<FutureGetaways />} /> */}
              {/* Add more routes as needed */}
              <Route path="*" element={<Footer />} /> {/* Fallback route */}
            </Routes>
          </main>

          <Footer />
          <Copyrights />
        </div>
      </Router>
  );
}

export default App;
