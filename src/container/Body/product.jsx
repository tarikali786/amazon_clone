import { useStateValue } from "../dataLayer";
import "./home.css";
import { Button } from "../../component";
export const Product = ({ title, image, price, rating, id }) => {
  const [{ basket }, dispatch] = useStateValue();

  console.log("basket", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        image: image,
      },
    });
  };
  return (
    <div className="product" key={id}>
      <div className="product__info">
        <p className="producct__title">{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <div className="product_image">
        <img src={image} alt="ss" />
      </div>
      <Button onClick={addToBasket} lable="Add to Basket " />
    </div>
  );
};
