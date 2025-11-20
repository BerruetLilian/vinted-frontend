import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Header from "./components/Header/Header";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import SignInModal from "./components/SignInModal/SignInModal";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
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
}

export default App;
