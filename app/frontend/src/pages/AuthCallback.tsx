import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useStore from '../store/useStore';
import api from '../lib/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useStore();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('No authentication token found.');
      return;
    }

    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setAuth(data.user, token);
        navigate('/dashboard', { replace: true });
      })
      .catch(() => {
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      });
  }, [searchParams, setAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      {error ? (
        <div className="text-center">
          <p className="text-red-400 text-sm mb-2">{error}</p>
          <p className="text-neutral-500 text-xs">Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-white animate-spin" />
          <span className="text-sm text-neutral-400">Completing sign-in...</span>
        </div>
      )}
    </div>
  );
}
