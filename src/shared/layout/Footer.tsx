
const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
      <>
        <footer className="bg-mt-dark-gray text-white">
          <div className="container mx-auto py-8 text-center">
            &copy; {currentYear} Movie Tracker. All rights reserved.
          </div>
        </footer>
      </>
  )
}

export default Footer