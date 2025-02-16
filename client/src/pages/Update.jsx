import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
    imgco: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];
  console.log(bookId);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/update/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="descr"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      /> 
      <input
        type="text"
        placeholder="Image Book No."
        name="imgco"
        onChange={handleChange}
      />      
      <button className="formButton" onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>

    </div>
  );
};

export default Update;