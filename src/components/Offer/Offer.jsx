import { Link } from "react-router-dom";
import "./offer.css";

const Offer = ({
  owner,
  product_image,
  product_price,
  product_details,
  _id,
}) => {
  const size = product_details.find((element) => element.TAILLE);
  const brand = product_details.find((element) => element.MARQUE);
  return (
    <article>
      <div className="avatar">
        {owner.account.avatar && (
          <img src={owner.account.avatar.secure_url} alt="user avatar" />
        )}
        <span>{owner.account.username}</span>
      </div>
      <Link to={"/offers/" + _id}>
        <img src={product_image.secure_url} alt="offer picture" />
        <div className="details">
          <span>{product_price + " €"}</span>
          {size && <span>{size.TAILLE}</span>}
          {brand && <span>{brand.MARQUE}</span>}
        </div>
      </Link>
    </article>
  );
};

export default Offer;
