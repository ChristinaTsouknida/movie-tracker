import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} />
  }

  return (
      <>
        <Outlet />
      </>
  )
}

export default ProtectedRoute;