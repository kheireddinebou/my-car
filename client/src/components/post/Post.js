import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { ShowEditContext } from "../../context/showEditContext copy/showEditContext ";
import EditForm from "../../pages/editForm/EditForm";
import { userRequest } from "../../requestMethods";
import "./post.scss";

const Post = ({ setShowSett, post, setUserPosts, userPosts }) => {
  const { setShowEdit, setEditedPost } = useContext(ShowEditContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSwitch = () => {
    setShowSett(false);
    setEditedPost(post);
    setShowEdit(true);
  };

  const handleDelete = async () => {
    try {
      const res = await userRequest.delete(`car/${currentUser._id}`, {
        data: {
          id: post._id,
        },
      });

      if (res) {
        setUserPosts(userPosts.filter(i => i._id !== post._id));
        setCurrentUser({
          ...currentUser,
          posts: currentUser.posts.filter(p => p._id !== post._id),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="post">
        <img src={post.images[post.img]} alt={post.model} />
        <span className="model">
          {post.make} {post.model}
        </span>
        <span className="name">
          {post.year} {post.title}
        </span>

        <div className="buttons">
          <button onClick={handleSwitch} className="edit">
            Edit
          </button>
          <button onClick={handleDelete} className="delete">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
