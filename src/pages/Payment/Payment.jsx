import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./payment.css";

const Payment = ({ stripePromise, token, setSignInVisible }) => {
  if (!token) {
    setSignInVisible(true);
    return <Navigate to="/" />;
  }
  const location = useLocation();
  const protectBuyerFee = 100;
  const transportFee = 100;
  const { title, price } = location.state;
  const amount = protectBuyerFee + transportFee + price * 100;
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: amount,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };

  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <main className="payment-page">
      <div className="payment-container">
        <p className="baseline">Résumé de la commande</p>
        <div className="summary">
          <div>
            <span>Commande</span>
            <span>{price + " €"}</span>
          </div>
          <div>
            <span>Frais protection acheteurs</span>
            <span>{protectBuyerFee / 100 + " €"}</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>{transportFee / 100 + " €"}</span>
          </div>
        </div>
        <div className="total">
          <div>
            <span>Total</span>
            <span>{amount / 100 + " €"}</span>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir
            <span>{" " + title}</span>. Vous allez payer{" "}
            <span>{amount / 100 + " € "}</span>
            (frais de protection et frais de port inclus).
          </p>
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm title={title} amount={amount} />
        </Elements>
      </div>
    </main>
  );
};

export default Payment;
