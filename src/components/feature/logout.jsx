import { ACCESS_TOKEN_KEY } from "../../constants/authentication";
import { getAccessToken } from "../../helpers/authentication";
import { logout } from "../../api/fakeApi";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import { useState } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout(getAccessToken());
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      size="small"
      disabled={isLoading}
      variant="secondary"
    >
      {isLoading ? "Izlogovanje..." : "Odjavi se"}
    </Button>
  );
}
