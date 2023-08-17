import "./Header.css";
import { BsSearch, BsCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { auth, useStateValue } from "../dataLayer";
import { useState } from "react";
export const Header = () => {
  const [{ basket, user }, depatch] = useStateValue();

  console.log("basket", basket);
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" name="" value="" />
        <BsSearch className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">&amp; Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <div className="header_optionBasket">
          <Link to="checkout">
            <BsCartCheckFill />
            <span className="header__optionLineTwo  header_basketCount ">
              {basket?.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
