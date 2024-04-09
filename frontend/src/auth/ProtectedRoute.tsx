import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";
 
const ProtectedRoute = ({ children }) => {
const [user, loading, error] = useAuthState(auth);
console.log("user: ", user);
console.log("children: ", children);
 
if (loading) {
return <div>Loading...</div>;
}
 
return user ? children : <Navigate to="/login" replace />;
};
 
export default ProtectedRoute;