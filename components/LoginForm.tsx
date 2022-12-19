import { useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const LoginForm = () => {
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      setUser(data);
    } catch {
      setIsErrVisible(true);
    }
    setLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-4  ">
        {user ? (
          <span className="text-4xl font-bold text-center">{user.name}</span>
        ) : null}
        <input
          className="bg-slate-900"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-slate-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-indigo-700"
          type="submit"
          disabled={!username || !password}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <span
          data-testid="error-message"
          className="text-red-500"
          style={{ visibility: isErrVisible ? 'visible' : 'hidden' }}
        >
          This is error message
        </span>
      </form>
    </>
  );
};
export default LoginForm;
