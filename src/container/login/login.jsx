import { useMemo, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../dataLayer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Button } from "../../component";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const isLoginButtonDisabled = useMemo(
    () => email.trim() === "" || password === "",
    [email, password]
  );
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    setIsLoginLoading(true);
    auth
      .signInWithEmailAndPassword(trimmedEmail, password)
      .then(() => {
        navigateTo("/");
      })
      .catch((error) => {
        alert(error.message);
      });
    // Handle login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    const trimmedEmail = email.trim();
    auth
      .createUserWithEmailAndPassword(trimmedEmail, password)
      .then((auth) => {
        console.log("user", auth);
        if (auth) {
          navigateTo("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="login">
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="Amazon Logo"
          />
        </Link>

        <div className="login__container">
          <h1>Sign-in</h1>
          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <VisibilityOffIcon
                  className="password-visibility-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <VisibilityIcon
                  className="password-visibility-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {/* <button
              type="submit"
              onClick={handleLogin}
              className="login__signInButton"
              disabled={isLoginButtonDisabled}
            >
              Sign-in
            </button> */}
            <Button
              onClick={handleLogin}
              disabledButton={isLoginButtonDisabled}
              lable={isLoginLoading ? "loading..." : "Sign-in"}
            />
          </form>

          <p>
            By signing in, you agree to Amazons Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice, and our Interest-based
            Ads Notice.
          </p>
          {/* <button onClick={handleRegister} className="login__registerButton">
            Create your Amazon Account
          </button> */}
          <Button
            onClick={handleRegister}
            disabledButton={isLoginButtonDisabled}
            lable={
              isRegisterLoading ? "loading..." : "Create your Amazon Account"
            }
          />
        </div>
      </div>
    </>
  );
};
