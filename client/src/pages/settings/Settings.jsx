import "./settings.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import {
  BsPersonCircle,
  BsFillTelephoneFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import Post from "../../components/post/Post";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { useState } from "react";
import EditForm from "../editForm/EditForm";
import { ShowEditContext } from "../../context/showEditContext copy/showEditContext ";

const Settings = ({ showSett, setShowSett }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { showEdit } = useContext(ShowEditContext);
  const [userPosts, setUserPosts] = useState(currentUser?.posts || null);
  const [editedPost, setEditedPost] = useState(null);
  const phone =
    [
      currentUser?.phone.slice(0, 3),
      " ",
      currentUser?.phone.slice(3, 7),
      " ",
      currentUser?.phone.slice(7),
    ].join("") || "";

  const handleLogout = () => {
    setCurrentUser(null);
  };
  return (
    <>
      <div className="settings" style={{ zIndex: showSett ? "10" : "-1" }}>
        <div style={{ right: showSett ? "0" : "-100%" }} className="card">
          <button
            onClick={() => setShowSett(false)}
            className="settings-close-btn"
          >
            <AiOutlineClose />
          </button>

          <span className="title">Profile</span>

          <div className="profile-info">
            <BsPersonCircle />
            <span>{currentUser.name}</span>
          </div>
          <div className="profile-info">
            <BsEnvelopeFill />
            <span>{currentUser.email}</span>
          </div>
          <div className="profile-info">
            <BsFillTelephoneFill />
            <span>{phone}</span>
          </div>

          <div className="line-wrapper">
            <div className="line"></div>
            <span>My Cars</span>
            <div className="line"></div>
          </div>

          <div className="posts">
            {userPosts?.length > 0 ? (
              userPosts?.map(p => (
                <Post
                  setUserPosts={setUserPosts}
                  userPosts={userPosts}
                  key={p._id}
                  post={p}
                  setShowSett={setShowSett}
                />
              ))
            ) : (
              <p className="message">You haven't created a post yet!</p>
            )}
          </div>

          <button
            style={{ right: showSett ? "0" : "-100%" }}
            className="logout-btn"
            onClick={handleLogout}
          >
            <BiLogOut className="icon" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
