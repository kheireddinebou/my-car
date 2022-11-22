import "./sellForm.scss";
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

const SellForm = () => {
  const [carInfo, setCarInfo] = useState({
    tags: [],
  });
  const [make, setMake] = useState("");
  const [images, setImages] = useState([]);
  const [favImg, setFavImg] = useState(0);
  const [err, setErr] = useState(null);
  const [files, setFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSellForm, setShowSellForm } = useContext(ShowSellContext);
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
      return { url, name: file.name };
    } catch (err) {
      setLoading(false);
    }
  };

  const handleChangeFile = e => {
    setErr(null);
    const newFiles = [];
    // check if the file is exists in the state
    [...e.target.files].map(f => {
      const findFile = files.find(i => i.name === f.name);
      if (findFile) {
        setErr({ type: "file", message: "You select this file before!" });
      } else {
        newFiles.push(f);
      }
    });
    if (newFiles.length > 4 || files.length + newFiles.length > 4) {
      setErr({ type: "file", message: "You cannot add more than 4 images" });
    } else {
      setFiles([...files, ...newFiles]);

      // uplaad files to cloudinary;
      const promises = [];
      newFiles.map(file => promises.push(uploadFile(file)));
      Promise.all(promises).then(res => {
        setImages([...res, ...images]);
        setLoading(false);
      });

      // remove img from removedImages List if it exists
      newFiles.map(file => {
        if (removedImages.find(n => n === file.name)) {
          setRemovedImages(removedImages.filter(i => i !== file.name));
        }
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

    if (!make && make === "") {
      setErr({ type: "make", message: "You dont add the make" });
      setLoading(false);
    }

    if (images.length < 1) {
      setLoading(false);
      setErr({ type: "file", message: "You have to add at least one image" });
    }
  };

  const handleCreate = async e => {
    setLoading(true);
    e.preventDefault();

    checkInputs();

    // upload data to database;
    if (!err && images.length > 0 && Object.keys(carInfo).length > 13) {
      const newCar = {
        ...carInfo,
        make: make.toLowerCase(),
        images: images.map(i => i.url),
        img: favImg,
      };

      try {
        const res = await userRequest.post(`car/${currentUser._id}`, newCar);
        res &&
          setCurrentUser({
            ...currentUser,
            posts: [res.data, ...currentUser.posts],
          });
        res && navigate(`/car/${res.data._id}`);
        setShowSellForm(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // remove RemovedImages from images list
    images.map(img => {
      if (removedImages.find(n => n === img.name)) {
        setImages(images.filter(i => i.name !== img.name));
      }
    });
  }, [removedImages, images]);

  return (
    <div className="sellForm" style={{ zIndex: showSellForm ? "10" : "-1" }}>
      <div style={{ right: showSellForm ? "0" : "-100%" }} className="card">
        <button
          onClick={() => setShowSellForm(false)}
          className="sellForm-close-btn"
        >
          <AiOutlineClose />
        </button>

        <span className="title">New Listing</span>
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

        {files.length > 0 ? (
          <ImagesInput
            favImg={favImg}
            setFavImg={setFavImg}
            files={files}
            setFiles={setFiles}
            removedImages={removedImages}
            setRemovedImages={setRemovedImages}
            edit={false}
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
          style={{ display: "none" }}
          required
          onChange={e => handleChangeFile(e)}
          accept="image/*"
          type="file"
          multiple
          id="imgInput"
        />
        <label htmlFor="imgInput" className="upload-btn">
          drag / upload images
        </label>

        {err?.type === "file" && <span className="error">{err.message}</span>}

        <div className="line-wrapper">
          <div className="line"></div>
          <span>car information</span>
          <div className="line"></div>
        </div>

        <form onSubmit={handleCreate}>
          <MakeInput make={make} setMake={setMake} />
          {err?.type === "make" && <span className="error">{err.message}</span>}

          {sellInputs.map((input, i) => (
            <div key={i} className="info-input">
              <label>{input.label}</label>

              <input
                required
                name={input.name}
                onChange={e => handleChange(e)}
                type={input.type}
                min={input.min}
                max={input.max}
                placeholder={input.placeholder}
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
            style={{ right: showSellForm ? "0" : "-100%" }}
            className="create-btn"
            disabled={loading}
            type="submit"
          >
            {!loading ? "Create" : "uploading..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
