import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   // MOUNTING
  //   alert("Selamat Datang");

  //   // UNMOUNTING
  //   // return () => {

  //   // }

  //   // [] = Updating
  // }, [count]);

  // INTEGRATE API GET
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`).then((res) => {
      setData(res.data);
    });
  }, []);

  const handleDetail = (data) => {
    navigate(`/about/${data.id}`, { state: { data } });
  };

  return (
    <div>
      <h1>About</h1>
      {/* CASE USE STATE NUMBER */}
      <h2>Count: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Tambahin dongg
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
        disabled={count == 0}
      >
        Kurangin dongg
      </button>
      {/* CASE USE STATE BOOLEAN */}
      {/* <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        POPUP
      </button>
      {open && (
        <div
          style={{
            width: "200px",
            height: "200px",
            padding: "10px",
            backgroundColor: "blue",
            marginTop: "50px",
          }}
        >
          <h4>INI POP UP</h4>
        </div>
      )} */}

      {/* CASE MAPPING DATA */}
      <div className="card">
        {data.map((item, index) => {
          return (
            <div
              onClick={() => handleDetail(item)}
              style={{
                backgroundColor: "green",
                width: "300px",
                cursor: "pointer",
              }}
            >
              <h4>{item.title}</h4>
              <img src={item.image} style={{ width: "150px" }} />
              <p>${item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
