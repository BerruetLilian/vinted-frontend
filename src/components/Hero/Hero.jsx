import "./hero.css";
import tear from "../../assets/img/tear.svg";

const Hero = () => {
  return (
    <div className="hero">
      <img src={tear} alt="déchirure peng" />
      <div className="container">
        <div className="ready">
          Prêts à faire du tri dans vos placards?
          <button>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
