import "./checkout.css";
import CurrencyFormat from "react-currency-format";
import { useMemo } from "react";
import { useStateValue } from "../dataLayer";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../component";

export const Subtotal = () => {
  const [{ basket }, depatch] = useStateValue();
  const navigateTo = useNavigate();
  const itemLength = basket.length;
  // console.log("leng", basket[-1].price);

  const totalAmount = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
      sum = sum + basket[i].price;
    }
    return sum;
  }, []);
  const handleProceedToCheckout = () => {
    navigateTo("/payments");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={() => (
          <div className="subtotal">
            <p>
              subtotal ({itemLength} item): <strong>${totalAmount}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" value="" />
              This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <Button onClick={handleProceedToCheckout} lable="Proceed to Checkout" />
    </div>
  );
};
