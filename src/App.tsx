import Layout from "./shared/layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import {Routes, Route} from "react-router";
import MyListPage from "./pages/MyListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  return (
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="my-list" element={<MyListPage />} />
          </Route>
        </Routes>
      </>
  )
}
export default App
