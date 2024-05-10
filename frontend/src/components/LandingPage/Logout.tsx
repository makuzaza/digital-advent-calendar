import { Button } from "@mui/material";
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
      <Button onClick={handleLogout} color="inherit">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
