import "./header.css";
import logo from "../../assets/img/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ setSignUpVisible, setSignInVisible, token, setToken }) => {
  const handleLogOut = () => {
    setToken(false);
    Cookies.remove("token");
  };
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div className="search">
          <FaMagnifyingGlass />
          <input type="text" placeholder="Recherche des articles" />
        </div>
        {token ? (
          <button className="logout-btn" onClick={handleLogOut}>
            Se déconnecter
          </button>
        ) : (
          <div className="sign-in-up">
            <button
              onClick={() => {
                setSignUpVisible(true);
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setSignInVisible(true);
              }}
            >
              Se connecter
            </button>
          </div>
        )}
        <button
          onClick={() => {
            if (!token) {
              setSignInVisible(true);
            } else {
              navigate("/publish");
            }
          }}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
