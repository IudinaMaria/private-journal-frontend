import { Link, useNavigate } from "react-router-dom";

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>📝 Private Journal</div>
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
