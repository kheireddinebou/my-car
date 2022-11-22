import "./editForm.scss";
import { AiOutlineClose, AiOutlineConsoleSql } from "react-icons/ai";
import { RiChargingPile2Fill } from "react-icons/ri";
import { useContext, useState } from "react";
import { ShowSellContext } from "../../context/showSellContext/showSellContext";
import MakeInput from "../../components/makeInput/MakeInput";
import { MutatingDots } from "react-loader-spinner";
import {
  bodyTips,
  colors,
  cylinders,
  doorsNum,
  fuleTypes,
  sellInputs,
  tagsType,
  transmissionTypes,
} from "../../data";
import axios from "axios";
import ImagesInput from "../../components/imagesInput/ImagesInput";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { useNavigate } from "react-router-dom";
import { ShowEditContext } from "../../context/showEditContext copy/showEditContext ";

const EditForm = () => {
  const { showEdit, setShowEdit, editedPost, setEditedPost } =
    useContext(ShowEditContext);
  const [carInfo, setCarInfo] = useState(editedPost);
  const [newMake, setNewMake] = useState(carInfo.make || "");
  const [newImages, setNewImages] = useState(carInfo.images);
  const [favImg, setFavImg] = useState(carInfo.img);
  const [err, setErr] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleTags = value => {
    if (carInfo.tags.includes(value)) {
      setCarInfo({
        ...carInfo,
        tags: carInfo.tags.filter(i => i !== value),
      });
    } else {
      setCarInfo({
        ...carInfo,
        tags: [...carInfo.tags, value],
      });
    }
  };

  const isClicked = (type, value) => {
    let check = false;
    if (Array.isArray(carInfo[type])) {
      check = carInfo[type].includes(value);
    } else if (type === "cylinders") {
      check = carInfo[type] === value.toString();
    } else {
      check = carInfo[type] === value;
    }

    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCarInfo({ ...carInfo, [name]: value });
  };

  const uploadFile = async file => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqkh79cry/image/upload",
        data
      );

      const { url } = res.data;
      return url;
    } catch (err) {
      setLoading(false);
    }
  };

  const handleChangeFile = e => {
    setErr(null);
    const newFiles = [...e.target.files];
    if (
      newFiles.length > 4 ||
      newFiles.length + newImages.length > 4 ||
      newImages.length > 4
    ) {
      setErr({ type: "file", message: "You cannot add more than 4 images" });
    } else {
      // uplaad files to cloudinary;
      const promises = [];
      newFiles.map(file => promises.push(uploadFile(file)));
      Promise.all(promises).then(res => {
        setNewImages([...res, ...newImages]);
        setLoading(false);
      });
    }
  };

  const checkInputs = () => {
    setErr(null);

    const Inputs = [
      "color",
      "fuel",
      "transmission",
      "cylinders",
      "doors",
      "type",
    ];

    Inputs.forEach(i => {
      if (!carInfo[i]) {
        setErr({ type: i, message: `You dont add ${i}` });
        setLoading(false);
      }
    });

    if (!newMake && newMake === "") {
      setErr({ type: "make", message: "You dont add the make" });
      setLoading(false);
    }

    if (newImages.length < 1) {
      setLoading(false);
      setErr({ type: "file", message: "You have to add at least one image" });
    }
  };

  const handleCreate = async e => {
    // setLoading(true);
    e.preventDefault();

    checkInputs();

    // upload data to database;
    if (!err && newImages.length > 0 && Object.keys(carInfo).length > 13) {
      const { _id, createdAt, updatedAt, __v, images, make, ...others } =
        carInfo;
      const newCar = {
        ...others,
        make: newMake.toLowerCase(),
        images: newImages,
        img: favImg,
      };

      try {
        const res = await userRequest.put(`car/${currentUser._id}`, {
          ...newCar,
          postId: editedPost._id,
        });
        res &&
          setCurrentUser({
            ...currentUser,
            posts: currentUser.posts.map(p => {
              if (p._id === editedPost._id) {
                return res.data;
              } else {
                return p;
              }
            }),
          });
        res && navigate(`/car/${res.data._id}`);
        setShowEdit(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // remove RemovedImages from newImages list
    newImages.map(img => {
      if (removedImages.find(n => n === img)) {
        setNewImages(newImages.filter(i => i !== img));
      }
    });
  }, [removedImages, newImages]);

  return (
    <div className="editForm" style={{ zIndex: showEdit ? "10" : "-1" }}>
      <div style={{ right: showEdit ? "0" : "-100%" }} className="card">
        <button
          onClick={() => setShowEdit(false)}
          className="editForm-close-btn"
        >
          <AiOutlineClose />
        </button>

        <span className="title">Edit Listing</span>
        {err && <span className="error">error!</span>}

        <div className="line-wrapper">
          <div className="line"></div>
          {loading ? (
            <MutatingDots
              color="gray"
              secondaryColor="gray"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              visible={true}
            />
          ) : (
            <span>add images</span>
          )}

          <div className="line"></div>
        </div>

        {newImages.length > 0 ? (
          <ImagesInput
            favImg={favImg}
            setFavImg={setFavImg}
            images={newImages}
            setImages={setNewImages}
            setRemovedImages={setRemovedImages}
            removedImages={removedImages}
            edit={true}
          />
        ) : (
          <>
            <span className="warning">
              Images subject to moderation. No watermarks, low resolution
              images, or screenshots.
            </span>
          </>
        )}

        <input
          required
          onChange={e => handleChangeFile(e)}
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          multiple
          id="inputImg"
        />
        <label htmlFor="inputImg" className="upload-btn">
          drag / upload images
        </label>

        {err?.type === "file" && <span className="error">{err.message}</span>}

        <div className="line-wrapper">
          <div className="line"></div>
          <span>car information</span>
          <div className="line"></div>
        </div>

        <form onSubmit={handleCreate}>
          <MakeInput make={newMake} setMake={setNewMake} />
          {err?.type === "make" && <span className="error">{err.message}</span>}

          {sellInputs.map((input, i) => (
            <div key={i} className="info-input">
              <label>{input.label}</label>

              <input
                required
                name={input.name}
                onChange={e => handleChange(e)}
                type={input.type}
                placeholder={input.placeholder}
                value={carInfo[input.label]}
              />
            </div>
          ))}

          <div className="info-input">
            <label>Description (Obtional)</label>
            <textarea
              name="desc"
              onChange={e => handleChange(e)}
              maxLength="300"
              cols="20"
              type="text"
              placeholder="Description"
              value={carInfo.desc}
            />
          </div>

          <div className="info-input">
            <label>Body Type</label>
            {err?.type === "type" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              {bodyTips.map((t, i) => (
                <div
                  onClick={() => setCarInfo({ ...carInfo, type: t.name })}
                  key={i}
                  className={`small-card ${
                    isClicked("type", t.name) ? "clicked" : ""
                  }`}
                >
                  <img src={t.img} alt={t.name} />
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-input">
            <label>Doors</label>
            {err?.type === "doors" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              {doorsNum.map((t, i) => (
                <span
                  onClick={() => setCarInfo({ ...carInfo, doors: t })}
                  key={i}
                  className={`small-card ${
                    isClicked("doors", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="info-input">
            <label>Cylinders</label>
            {err?.type === "cylinders" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              <div
                onClick={() =>
                  setCarInfo({ ...carInfo, cylinders: "electric" })
                }
                className={`small-card ${
                  isClicked("cylinders", "electric") ? "clicked" : ""
                }`}
              >
                <RiChargingPile2Fill />
              </div>

              {cylinders.map((t, i) => (
                <span
                  onClick={() => setCarInfo({ ...carInfo, cylinders: t })}
                  key={i}
                  className={`small-card ${
                    isClicked("cylinders", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="info-input">
            <label>Transmission</label>
            {err?.type === "transmission" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              {transmissionTypes.map((t, i) => (
                <span
                  onClick={() => setCarInfo({ ...carInfo, transmission: t })}
                  key={i}
                  className={`small-card ${
                    isClicked("transmission", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="info-input">
            <label>Fuel</label>
            {err?.type === "fuel" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              {fuleTypes.map((t, i) => (
                <span
                  onClick={() => setCarInfo({ ...carInfo, fuel: t })}
                  key={i}
                  className={`small-card ${
                    isClicked("fuel", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="info-input">
            <label>Color</label>
            {err?.type === "color" && (
              <span className="error">{err.message}</span>
            )}
            <div className="cards-wrapper">
              {colors.map((t, i) => (
                <span
                  onClick={() => setCarInfo({ ...carInfo, color: t })}
                  key={i}
                  className={`small-card ${
                    isClicked("color", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="info-input">
            <label>Tags (Obtional)</label>

            <div className="cards-wrapper">
              {tagsType.map((t, i) => (
                <span
                  onClick={() => handleTags(t)}
                  key={i}
                  className={`small-card ${
                    isClicked("tags", t) ? "clicked" : ""
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            style={{ right: showEdit ? "0" : "-100%" }}
            className="edit-btn"
            disabled={loading}
            type="submit"
          >
            {!loading ? "Edit" : "uploading..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
