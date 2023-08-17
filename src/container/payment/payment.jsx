import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../dataLayer";
import { CheckoutProduct } from "../checkout";
import { Link } from "react-router-dom";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import "./payment.css";
import { Button } from "../../component";
export const Payment = () => {
  const navigateTo = useNavigate();

  const [{ basket, user }] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        `/payments/create?total=${getBasketTotal(basket) * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("the secet is>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
    } else {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigateTo("/order");
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const getBasketTotal = (basket) => {
    let total = 0;
    basket.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const totalAmount = getBasketTotal(basket);
  const itemLength = basket.length;

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items </Link>
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <div>
              <p>{user?.email}</p>
              <p>122 React Learn</p>
              <p>Los Angeles, CA</p>
              <p>Phone/mobile Number:+12-9829837</p>
            </div>
            {/* 
            <div>
              <p>Edit</p>
            </div> */}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={item.id}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <div className="subtotal">
                      <p>
                        Subtotal ({itemLength} item): <strong>{value}</strong>
                      </p>
                      <small className="subtotal__gift">
                        <input type="checkbox" name="" value="" />
                        This order contains a gift
                      </small>
                    </div>
                  )}
                  decimalScale={2}
                  value={totalAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button> */}
                <Button
                  disabledButton={processing || disabled || succeeded}
                  lable={
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  }
                  optionalClassName="buyButton"
                />
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
