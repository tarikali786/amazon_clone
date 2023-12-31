import "./checkout.css";
import { Subtotal } from "./subtotal";
import { useStateValue } from "../dataLayer";
// import { CheckoutProduct } from "./index";
import { CheckoutProduct } from "./checkoutProduct";

export const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <>
      <div className="checkout">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />

          <div>
            <h3>Hello {user?.email}</h3>
            {/* <h2 className="checkout__title">Your shoping Basket</h2> */}
            {basket.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  key={item.id}
                />
              );
            })}
          </div>
        </div>
        <div className="checkout__right">
          <Subtotal />
          {/* <h2>The subtotal will go here</h2> */}
        </div>
      </div>
    </>
  );
};
