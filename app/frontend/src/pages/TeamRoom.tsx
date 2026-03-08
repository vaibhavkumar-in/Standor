import { Navigate } from 'react-router-dom';

// Team Rooms was a NetSculpt investigation feature. Redirect to the dashboard.
export default function TeamRoom() {
  return <Navigate to="/dashboard" replace />;
}
