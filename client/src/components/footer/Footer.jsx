import {
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container wrapper">
        <div className="left">
          <h1 className="logo">MyCar</h1>
          <span>
            The Future of Car Classifieds in United States. MyCar is an Easy,
            Fast and Free car classifieds website for all and it tops it up with
            exposure across all the countries in the United States in a matter
            of seconds.
          </span>
          <div className="links">
            <Link>
              <BsYoutube />
            </Link>
            <Link>
              <BsTwitter />
            </Link>
            <Link>
              <BsFacebook />
            </Link>
            <Link>
              <BsInstagram />
            </Link>
          </div>
        </div>

        <div className="center">
          <div className="col">
            <span>Quick Links</span>
            <Link>About us</Link>
            <Link>Classifieds</Link>
            <Link>Log in</Link>
            <Link>Sign up</Link>
          </div>
          <div className="col">
            <span>Support</span>
            <Link>Affiliates Program</Link>
            <Link>Become a Partner</Link>
            <Link>Terms nd Conditions</Link>
          </div>
        </div>

        <div className="footer-right">
          <div className="right-wrapper">
            <span className="top">Contact us</span>
            <div className="col">
              <span>Email</span>
              <div className="contact">
                <BsEnvelope className="icon" />
                <span>mycar@contact.com</span>
              </div>
            </div>

            <div className="col">
              <span>Whatsapp</span>
              <div className="contact">
                <BsWhatsapp className="icon" />
                <span>+08 000 0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="copyrights">
        Copyright © MyCar 2022. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
