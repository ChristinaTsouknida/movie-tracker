import Layout from "./shared/layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import {Routes, Route} from "react-router";
import MyListPage from "./pages/MyListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AuthLayout from "./shared/layout/AuthLayout.tsx";
import ProtectedRoute from "./shared/ProtectedRoute.tsx";

function App() {
  return (
      <>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="my-list" element={<MyListPage />} />
            </Route>
          </Route>
        </Routes>
      </>
  )
}

export default App;