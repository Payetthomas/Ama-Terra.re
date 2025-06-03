import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TDecodedUser } from "../../@types/userTypes";
import axios from "axios";
import { useAuth } from "../../AuthContext/AuthContext";
import styles from "./AuthPages.module.scss";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
        // Stock le token
        localStorage.setItem("token", res.data.token);

        const decodeUser = jwtDecode<TDecodedUser>(res.data.token);
        setUser(decodeUser);
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
