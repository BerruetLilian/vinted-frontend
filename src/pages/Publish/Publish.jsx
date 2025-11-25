import { Navigate } from "react-router-dom";
import "./publish.css";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";

const Publish = ({ token, setSignInVisible }) => {
  if (!token) {
    setSignInVisible(true);
    return <Navigate to="/" state={{ from: "/publish" }} />;
  }
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [trade, setTrade] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", location);
    formData.append("price", price);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 500) {
        console.error("An error occured");
      } else {
        console.error(error.response.data.message);
      }
    }
  };
  return (
    <main className="publish-page">
      <div className="container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div className="preview">
              {!file.name ? (
                <div className="input-design">
                  <label htmlFor="file">
                    <FaPlusCircle /> Ajoute une photo
                  </label>

                  <input
                    type="file"
                    id="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = (event) => {
                        setImgSrc(reader.result);
                      };
                      reader.readAsDataURL(file);
                      setFile(event.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div className="image-file">
                  <img src={imgSrc} />
                  <div
                    className="remove"
                    onClick={() => {
                      setFile({});
                    }}
                  >
                    X
                  </div>
                </div>
              )}
            </div>
          </div>
          <section>
            <div className="text-input">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="description">Décris ton article</label>
              <input
                type="text"
                id="description"
                placeholder="ex: porté quelque fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </section>
          <section>
            <div className="text-input">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                placeholder="ex: L/40/12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="condition">Etat</label>
              <input
                type="text"
                id="condition"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="location">Lieu</label>
              <input
                type="text"
                id="location"
                placeholder="ex: Paris"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
          </section>
          <section>
            <div className="text-input">
              <label htmlFor="price">Prix</label>
              <input
                type="text"
                id="price"
                placeholder="0.00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="checkbox-container">
              <div className="checkbox-input">
                <input
                  id="trade"
                  type="checkbox"
                  checked={trade}
                  onChange={() => {
                    setTrade((prev) => !prev);
                  }}
                />
                <label htmlFor="trade">
                  Je suis intéressé(e) par les échanges
                </label>
              </div>
            </div>
          </section>
          <div className="form-end">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Publish;
