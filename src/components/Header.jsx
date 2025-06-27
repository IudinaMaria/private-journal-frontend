import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      localStorage.removeItem('token');
      onLogout();
      navigate('/');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };

  return (
    <header className="bg-indigo-600 text-white px-6 py-4 shadow-lg rounded-b-2xl flex justify-between items-center animate-fade-in-down">
      <div className="flex items-center gap-6">
        <div
          className="text-2xl md:text-3xl font-extrabold cursor-pointer hover:text-indigo-200 transition duration-200"
          onClick={() => navigate('/')}
        >
          📝 Private Journal
        </div>
        <nav className="flex gap-4 text-sm md:text-base">
          <Link to="/entries" className="hover:underline hover:text-indigo-200 transition">Мои записи</Link>
          <Link to="/create" className="hover:underline hover:text-indigo-200 transition">Добавить запись</Link>
          <Link to="/logins" className="hover:underline hover:text-indigo-200 transition">История входов</Link>
          <Link to="/about" className="hover:underline hover:text-indigo-200 transition">О приложении</Link>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-xl"
      >
        Выйти
      </button>
    </header>
  );
}
