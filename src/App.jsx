import { useEffect, useMemo } from "react";
import "./App.css";
import {
  Header,
  Home,
  Checkout,
  Login,
  useStateValue,
  Payment,
} from "./container/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./container/index";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NLfpWSGdaY5SfT3CFhW6bnCEMKOhbHXBqpC5Egbl8eIGXkZ4eIIyNPU0krWT0vtCVjERT5q72lPbc03p2mfMyIS00YMxJojrx"
);

function App() {
  const [{}, dispatch] = useStateValue();
  const { pathname } = window.location;
  const isLogin = useMemo(() => pathname.includes("login"), [pathname]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is>>> ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          {!isLogin && <Header />}
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="payments"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
