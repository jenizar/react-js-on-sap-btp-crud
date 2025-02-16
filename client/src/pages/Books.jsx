import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//https://stackoverflow.com/questions/54033765/how-to-give-image-src-dynamically-in-react-js

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        console.log(res.data);
        //res.redirect('/');
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.get(`http://localhost:8800/delete/${id}`);
      const res = await axios.post(`http://localhost:8800/delete/${id}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
//`./books/${book.IMGCO}.png`
  return (
    <div>
      <h1>Book Library</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.ID}>     
            {book.COVER && <img src={require(`./books/${book.IMGCO}.jpg`)} alt="" />}
            <h2>{book.TITLE}</h2>
            <p>{book.DESCR}</p>
            <p>{book.PRICE}</p>
            <button className="delete" onClick={()=>{handleDelete(book.ID)}}>Delete</button>
            <button className="update"><Link to={`/update/${book.ID}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

  export default Books;