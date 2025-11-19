import { Link } from "react-router-dom";
import "./offer.css";

const Offer = ({
  owner,
  product_pictures,
  product_price,
  product_details,
  _id,
}) => {
  const size = product_details.find((element) => element.TAILLE);
  const brand = product_details.find((element) => element.MARQUE);
  return (
    <Link to={"/offers/" + _id}>
      <article>
        <div className="avatar">
          <img src={owner.account.avatar.url} alt="user avatar" />
          <span>{owner.account.username}</span>
        </div>
        <img src={product_pictures[0].url} alt="offer picture" />
        <div className="details">
          <span>{product_price + " €"}</span>
          {size && <span>{size.TAILLE}</span>}
          {brand && <span>{brand.MARQUE}</span>}
        </div>
      </article>
    </Link>
  );
};

export default Offer;
