import { Link, useNavigate } from 'react-router';

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }


  return (
      <>
        <header className="bg-mt-dark-gray fixed w-full py-4 z-20">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-white font-bold text-lg">Movie Tracker</Link>
            <nav className="flex items-center gap-6 text-white font-medium">
              <Link to="/home">Home</Link>
              <Link to="/my-list">My List</Link>

              <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
      </>
  )
}

export default Header