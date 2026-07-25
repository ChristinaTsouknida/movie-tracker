
const Header = () => {
  return (
      <>
        <header className="bg-mt-dark-gray fixed w-full py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <a href="/" className="text-white font-bold text-lg">
              Movie Tracker
            </a>
            <nav className="flex gap-4 text-white font-medium">
              <a href="/home">Home</a>
              <a href="/mylist">My List</a>
            </nav>
          </div>
        </header>
      </>
  )
}

export default Header