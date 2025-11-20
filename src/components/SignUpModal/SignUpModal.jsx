import { useState, useEffect } from "react";
import "./signUpModal.css";
import axios from "axios";
import Cookies from "js-cookie";

const SignUpModal = ({ setSignUpVisible, setSignInVisible, setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [loading, setLoading] = useState(false);

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
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email: email,
            username: userName,
            password: password,
            newsletter: newsletter,
          }
        );
        console.log(response.data);
        Cookies.set("token", response.data.token, { expires: 7 });
        setToken(response.data.token);
        setLoading(false);
        setSignUpVisible(false);
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
        setSignUpVisible(false);
      }}
    >
      <div
        className="sign-up-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="leave-button"
          onClick={() => {
            setSignUpVisible(false);
          }}
        >
          X
        </button>
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            placeholder="Email"
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
          <div className="checkBox">
            <div>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => {
                  setNewsLetter((prev) => !prev);
                }}
              />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button className={loading ? "waiting-btn" : ""}>S'inscrire</button>
        </form>
        <p
          onClick={() => {
            setSignUpVisible(false);
            setSignInVisible(true);
          }}
        >
          Tu as déjà un compte? Connecte-toi!
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
