import { IoIosClose } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import "./imagesInput.scss";

const imagesInput = ({
  favImg,
  setFavImg,
  images,
  setImages,
  setRemovedImages,
  removedImages,
  files,
  setFiles,
  edit,
}) => {
  const handleDelete = img => {
    if (edit) {
      setImages(images.filter(i => i !== img));
      setRemovedImages([...removedImages, img]);
    } else {
      setFiles(files.filter(i => i.name !== img.name));
      setRemovedImages([...removedImages, img.name]);
    }
  };

  const isFavImg = index => {
    if (index === favImg) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="imagesInput">
      {edit
        ? images?.map((img, i) => (
            <div key={i} className="imgWrapper">
              <IoIosClose
                onClick={() => handleDelete(img)}
                className="delete-icon"
              />

              <AiFillStar
                onClick={() => setFavImg(i)}
                className={`fav-icon ${isFavImg(i) ? "favorite" : ""}`}
              />
              <img src={img} alt="" />
            </div>
          ))
        : files?.map((img, i) => (
            <div key={i} className="imgWrapper">
              <IoIosClose
                onClick={() => handleDelete(img)}
                className="delete-icon"
              />

              <AiFillStar
                onClick={() => setFavImg(i)}
                className={`fav-icon ${isFavImg(i) ? "favorite" : ""}`}
              />
              <img src={URL.createObjectURL(img)} alt="" />
            </div>
          ))}
    </div>
  );
};

export default imagesInput;
