import React, { useContext, useState, useEffect } from "react";
import { fetchData, getDataById } from "../../lib/API";
import { DataContext } from "../Context/DataContext";
import { EditContext } from "../Context/EditContext";
import { editData as editDatabase, addData } from "../../lib/API";

const DEFAULT_DATA = {
  id: -1,
  name: "",
  description: "",
  category: "",
  release_year: 2007,
  size: 0,
  price: 0,
  rating: 0,
  image_url: "",
  is_android_app: false,
  is_ios_app: false,
};

export default function AppForm() {
  const [onErrorCheckbox, setErrorCheckbox] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [editState, setEditState] = useState({ mode: false, id: -1 });

  const { editData, resetEdit } = useContext(EditContext);
  const { setData } = useContext(DataContext);

  useEffect(async () => {
    if (editData.isEditMode) {
      const data = await getDataById(editData.id);
      setFormData(data);

      setEditState({ mode: true, id: editData.id });
      resetEdit();
    }
  }, [editData]);

  const changeHandler = (e) => {
    const name = e.target.name;
    if (name === "android_app") {
      setFormData({
        ...formData,
        is_android_app: e.target.checked,
      });
    } else if (name === "ios_app") {
      setFormData({
        ...formData,
        is_ios_app: e.target.checked,
      });
    } else {
      let value = e.target.value;
      if (e.target.type === "number") {
        value = Number.isNaN(parseInt(value)) ? "" : parseInt(value);
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.is_android_app && !formData.is_ios_app) {
      setErrorCheckbox(true);
    } else {
      setErrorCheckbox(false);

      let success = false;
      const { id, ...sendData } = formData;

      if (editState.mode) {
        success = await editDatabase(id, sendData);
      } else {
        success = await addData(sendData);
      }

      if (success) {
        const newData = await fetchData();
        setData(newData);

        setFormData(DEFAULT_DATA);
        setEditState({ mode: false, id: -1 });
      }
    }
  };

  return (
    <div className="form">
      <h2 style={{ textAlign: "center" }}>Mobile Apps Form</h2>
      <form onSubmit={submitHandler}>
        <div className="form-component">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={formData.description}
            name="description"
            onChange={changeHandler}
            required
          ></textarea>
        </div>
        <div className="form-component">
          <label htmlFor="release-year">Release Year:</label>
          <input
            type="number"
            id="release-year"
            name="release_year"
            min="2007"
            max="2021"
            onChange={changeHandler}
            value={formData.release_year}
          />
        </div>
        <div className="form-component">
          <label htmlFor="size">Size(MB):</label>
          <input
            type="number"
            min="0"
            required
            name="size"
            onChange={changeHandler}
            value={formData.size}
          />
        </div>
        <div className="form-component">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            name="price"
            min="0"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            onChange={changeHandler}
            value={formData.rating}
          />
        </div>
        <div className="form-component">
          <label htmlFor="image-url">Image Url:</label>
          <textarea
            id="image-url"
            value={formData.image_url}
            name="image_url"
            required
            onChange={changeHandler}
          ></textarea>
        </div>
        <div
          className={
            onErrorCheckbox
              ? "form-component form-checkbox error-checkbox"
              : "form-component form-checkbox"
          }
        >
          <label>Platform:</label>
          <div className="checkbox">
            <div className="option">
              <input
                type="checkbox"
                name="android_app"
                id="android"
                onChange={changeHandler}
                checked={formData.is_android_app}
              />
              <label htmlFor="android">Android</label>
            </div>
            <div className="option">
              <input
                type="checkbox"
                name="ios_app"
                id="ios"
                onChange={changeHandler}
                checked={formData.is_ios_app}
              />
              <label htmlFor="ios">iOS</label>
            </div>
          </div>
          <div className="break"></div>
          {onErrorCheckbox ? <p>Please at least choose one</p> : null}
        </div>
        <div className="form-action">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
