import Header from './Header'
import Footer from './Footer'
import {Outlet} from "react-router";

const Layout = () => {
  return (
      <>
        <div className="flex flex-col h-screen bg-mt-black">
          <Header/>
          <main className="flex-1 overflow-auto container mx-auto flex items-center justify-center">
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </>
  )
}

export default Layout