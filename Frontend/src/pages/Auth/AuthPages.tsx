import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext/AuthContext";
import styles from "./AuthPages.module.scss";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isLogin
        ? "http://localhost:1818/api/auth/login"
        : "http://localhost:1818/api/auth/register";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(endpoint, payload);

      setMessage(res.data.message);

      if (isLogin) {
        await login(res.data.token);
        navigate("/");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <section className={styles.authPage}>
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <>
            <input
              name="firstname"
              placeholder="Prénom"
              value={form.firstname}
              onChange={handleChange}
              required
            />
            <input
              name="lastname"
              placeholder="Nom"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Mot de passe"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>

      <p className={styles.toggle}>
        {isLogin ? "Pas encore inscrit ?" : "Déjà inscrit ?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "Se connecter"}
        </span>
      </p>

      {message && <p className={styles.message}>{message}</p>}
    </section>
  );
};

export default AuthPage;
