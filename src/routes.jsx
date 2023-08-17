import { useMemo } from "react";
import "./App.css";
import { Header, Home, Checkout, Login } from "./container/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const userType = "Auth";

  const renderView = useMemo(() => {
    switch (userType) {
      case "UnAuth":
        return (
          <>
            <Routes>
              <Route path="signin" element={<Login />} />
            </Routes>
          </>
        );
      default:
        return (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="checkout" element={<Checkout />} />
            </Routes>
          </>
        );
    }
  }, []);
  return (
    <>
      <div>
        <BrowserRouter>{renderView}</BrowserRouter>
      </div>
    </>
  );
}

// export default App;
