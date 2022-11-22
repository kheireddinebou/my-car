import "./login.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import { ShowAuthContext } from "../../context/showAuthContext/showAuthContext";
import { useRef } from "react";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { publicRequest } from "../../requestMethods";

const Login = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const { showLogin, setShowLogin, setShowRegister } =
    useContext(ShowAuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleLogin = async e => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await publicRequest.post("auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      setCurrentUser(res.data);
      setShowLogin(false);
      setLoading(false);
    } catch (err) {
      setErr(err.response.data);
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  return (
    <div className="login" style={{ zIndex: showLogin ? "10" : "-1" }}>
      <div className="card" style={{ right: showLogin ? "0" : "-100%" }}>
        <button onClick={() => setShowLogin(false)} className="login-close-btn">
          <AiOutlineClose />
        </button>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input ref={email} type="email" placeholder="Email" required />
          {err?.type === "email" && (
            <span className="error">{err.message}</span>
          )}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            required
            minLength="6"
          />
          {err?.type === "password" && (
            <span className="error">{err.message}</span>
          )}

          <button disabled={loading} type="submit" className="login-btn">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="center">
          <div className="line"></div>
          <span>or create Account</span>
          <div className="line"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleSwitch}
          className="register-btn"
        >
          create new account
        </button>
      </div>
    </div>
  );
};

export default Login;
