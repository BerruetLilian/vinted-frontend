import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./offer.css";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const navigate = useNavigate();

  const convertToHtml = (obj) => {
    const entries = Object.entries(obj);
    return (
      <>
        <span>{entries[0][0]}</span>
        <span>{entries[0][1]}</span>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
      );
      setOffer(response.data);
    };
    fetchData();
  }, [id]);
  return (
    <main className="offer-page">
      <div className="container">
        {Object.keys(offer).length !== 0 && (
          <>
            <img src={offer.product_image.secure_url} />
            <div className="infos">
              <div className="details">
                <span>{offer.product_price + " €"}</span>
                <ul>
                  {offer.product_details.map((element, index) => {
                    return <li key={index}>{convertToHtml(element)}</li>;
                  })}
                </ul>
              </div>
              <div className="content">
                <p>{offer.product_name}</p>
                <p>{offer.product_description}</p>
                <div className="avatar">
                  {offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.url}
                      alt="user avatar"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/payment", {
                    state: {
                      title: offer.product_name,
                      price: offer.product_price,
                    },
                  });
                }}
              >
                Acheter
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Offer;
