import "./header.css";
import logo from "../../assets/img/logo.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
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
        <div className="sign-in-up">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
