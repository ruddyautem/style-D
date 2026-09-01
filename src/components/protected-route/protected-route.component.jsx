import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../../stores/userStore";

const ProtectedRoute = () => {
  const { currentUser, isInitializing } = useUserStore();
  const location = useLocation();

  if (isInitializing) {
    // Show a loading state or nothing while Firebase auth initializes
    return <div>Chargement...</div>;
  }

  if (!currentUser) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
