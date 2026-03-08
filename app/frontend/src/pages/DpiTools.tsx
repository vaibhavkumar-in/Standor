import { Navigate } from 'react-router-dom';

// DPI Tools was a NetSculpt-specific feature. Redirect to the problems library.
export default function DpiTools() {
  return <Navigate to="/problems" replace />;
}
