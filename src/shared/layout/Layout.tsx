import Header from './Header'
import Footer from './Footer'
import type {LayoutProps} from "../types.ts";


const Layout = ({children, addClasses}: LayoutProps)=> {

  return (
      <>
        <div className={`flex flex-col h-screen ${addClasses}`}>
          <Header/>
          <main className="flex-1 overflow-auto container mx-auto">{children}</main>
          <Footer/>
        </div>
      </>
  )
}

export default Layout