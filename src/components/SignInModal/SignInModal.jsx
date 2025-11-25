import "./signInModal.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SignInModal = ({ setSignUpVisible, setSignInVisible, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        Cookies.set("token", response.data.token, { expires: 7 });
        setToken(response.data.token);
        setLoading(false);
        setSignInVisible(false);
        if (location.state && location.state.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="modal-container"
      onClick={() => {
        setSignInVisible(false);
      }}
    >
      <div
        className="sign-in-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="leave-button"
          onClick={() => {
            setSignInVisible(false);
          }}
        >
          X
        </button>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Adresse email"
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className={loading ? "waiting-btn" : ""}>Se connecter</button>
        </form>
        <p
          onClick={() => {
            setSignUpVisible(true);
            setSignInVisible(false);
          }}
        >
          Pas encore de compte? Inscris-toi !
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
