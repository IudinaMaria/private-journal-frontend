import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as AWS from 'aws-amplify';

const { Auth } = AWS;

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Выход из системы с использованием AWS Amplify
      await Auth.signOut();
      // Удаление токена из localStorage
      localStorage.removeItem('token');
      // Вызов onLogout, чтобы обновить состояние в родительском компоненте
      onLogout();
      // Перенаправление на главную страницу или страницу входа
      navigate('/');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          📝 Private Journal
        </div>
        <nav className="flex gap-4 text-sm md:text-base">
          <Link to="/entries" className="hover:underline">Мои записи</Link>
          <Link to="/create" className="hover:underline">Добавить запись</Link>
          <Link to="/logins" className="hover:underline">История входов</Link>
          <Link to="/about" className="hover:underline">О приложении</Link>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
      >
        Выйти
      </button>
    </header>
  );
}
