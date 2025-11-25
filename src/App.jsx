import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header/Header";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import SignInModal from "./components/SignInModal/SignInModal";
import { useState } from "react";
import Cookies from "js-cookie";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";

// Cette ligne permet de vous connecter à votre compte Stripe en fournissant votre clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP",
  { developerTools: { assistant: { enabled: false } } }
);
const App = () => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("token"));

  return (
    <div className="App">
      <Router>
        <Header
          setSignUpVisible={setSignUpVisible}
          setSignInVisible={setSignInVisible}
          token={token}
          setToken={setToken}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/publish"
            element={
              <Publish token={token} setSignInVisible={setSignInVisible} />
            }
          />
          <Route
            path="/payment"
            element={
              <Payment
                stripePromise={stripePromise}
                token={token}
                setSignInVisible={setSignInVisible}
              />
            }
          />
        </Routes>
        {signUpVisible && (
          <SignUpModal
            setSignUpVisible={setSignUpVisible}
            setSignInVisible={setSignInVisible}
            setToken={setToken}
          />
        )}
        {signInVisible && (
          <SignInModal
            setSignUpVisible={setSignUpVisible}
            setSignInVisible={setSignInVisible}
            setToken={setToken}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
