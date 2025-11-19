import "./catalog.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../Offer/Offer";

const Catalog = () => {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setCatalog(response.data.offers);
      console.log(response.data.offers);
    };
    fetchData();
  }, []);
  return (
    <main>
      <div className="container">
        {catalog.length !== 0 &&
          catalog.map((offer) => {
            return <Offer key={offer._id} {...offer} />;
          })}
      </div>
    </main>
  );
};

export default Catalog;
