import { Navigate } from 'react-router-dom';

// Upload was a PCAP-specific feature from NetSculpt. Redirect to create-session.
export default function Upload() {
  return <Navigate to="/create-session" replace />;
}
