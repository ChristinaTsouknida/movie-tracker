import { Link } from 'react-router';

const Header = () => {
  return (
      <>
        <header className="bg-mt-dark-gray fixed w-full py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-white font-bold text-lg">Movie Tracker</Link>
            <nav className="flex gap-4 text-white font-medium">
              <Link to="/home">Home</Link>
              <Link to="/my-list">My List</Link>
            </nav>
          </div>
        </header>
      </>
  )
}

export default Header