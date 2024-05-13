import { useNavigate } from "react-router";
import { logout } from "../../auth/firebase";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setToken } from "../../store/tokenSlice";
import { setUid } from "../../store/uidSlice";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout();
    navigate("/");
    dispatch(setToken(""));
    dispatch(setUid(""));
  };

  return (
    <div>
      <div onClick={handleLogout} color="inherit">
        Logout
      </div>
    </div>
  );
};

export default Logout;
