import "./register.scss";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useContext, useState } from "react";
import { ShowAuthContext } from "../../context/showAuthContext/showAuthContext";
import { publicRequest } from "../../requestMethods";

const Register = () => {
  const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({});

  const { showRegister, setShowLogin, setShowRegister } =
    useContext(ShowAuthContext);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await publicRequest.post("auth/register", formData);
      setShowRegister(false);
      setShowLogin(true);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleSwitch = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <div className="register" style={{ zIndex: showRegister ? "10" : "-1" }}>
      <div style={{ right: showRegister ? "0" : "-100%" }} className="card">
        <button
          onClick={() => setShowRegister(false)}
          className="login-close-btn"
        >
          <AiOutlineClose />
        </button>

        <button onClick={handleSwitch} className="return-btn">
          <MdKeyboardArrowLeft />
        </button>
        <span className="title">Register</span>
        <form onSubmit={handleRegister}>
          <input
            name="name"
            onChange={e => handleChange(e)}
            type="text"
            placeholder="name"
            required
          />
          <input
            name="phone"
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Phone"
            required
          />
          <input
            name="email"
            onChange={e => handleChange(e)}
            type="email"
            placeholder="Email"
            required
          />
          {err?.type === "email" && (
            <span className="error">{err.message}</span>
          )}
          <input
            name="password"
            onChange={e => handleChange(e)}
            type="password"
            placeholder="Password"
            minLength="6"
            required
          />
          <button type="submit" className="login-btn">
            Create Your account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
