import PublicLayout from "../components/feature/public-layout";
import { useState } from "react";
import TextInputField from "../components/ui/text-input";
import Button from "../components/ui/button";
import style from "./login.module.css";
import { login } from "../api/fakeApi";
import { useNavigate } from "react-router";
import LocalLink from "../components/ui/local-link";
import { ACCESS_TOKEN_KEY } from "../constants/authentication";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, id) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const accessToken = await login(formValues.email, formValues.password);
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      navigate("/");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout heading="Prijavi se">
      <form onSubmit={(e) => e.preventDefault()} className={style.form}>
        <TextInputField
          id="email"
          label="Imejl adresa"
          onChange={handleChange}
          value={formValues.email}
          autoComplete="username"
        />
        <TextInputField
          id="password"
          label="Lozinka"
          onChange={handleChange}
          value={formValues.password}
          type="password"
          autoComplete="current-password"
        />
        <div>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Prijavljivanje..." : "Prijavi se"}
          </Button>
        </div>
        {apiError && <div className={style.error}>{apiError}</div>}
        <div>
          <LocalLink to="/sign-up">Nemate nalog? Idite na stranicu za registraciju.</LocalLink>
        </div>
      </form>
    </PublicLayout>
  );
}
