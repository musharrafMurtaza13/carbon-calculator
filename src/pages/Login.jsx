import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('authToken', 'mock-token');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`rounded-lg shadow-lg p-8 max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            darkMode={darkMode}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            darkMode={darkMode}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className={`text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Demo: Use any email/password
        </p>
      </div>
    </div>
  );
}