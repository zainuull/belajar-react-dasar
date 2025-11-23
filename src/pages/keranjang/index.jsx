import React, { useState } from "react";
import "./style.css";

export default function Keranjang() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Iphone 14 Deep purple",
      price: 15000000,
      qty: 1,
      img: "https://tse3.mm.bing.net/th/id/OIP.ZvyuyjSwI2kljzpr8-LVWgHaHa?pid=Api&P=0&h=180",
    },
    {
      id: 2,
      name: "Iphone 14",
      price: 8000000,
      qty: 2,
      img: "https://tse4.mm.bing.net/th/id/OIP.g5OHqo_Knatn946S9tCO3QHaFC?pid=Api&P=0&h=180",
    },
  ]);

  const increase = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decrease = (id) => {
    setItems(items.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)));
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-container">
      <h1 className="title">Keranjang Belanja</h1>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img} className="item-img" alt={item.name} />

          <div className="item-info">
            <h2 className="item-name">{item.name}</h2>
            <p className="price">Rp {item.price.toLocaleString()}</p>
            <p className="subtotal">Subtotal: Rp {(item.price * item.qty).toLocaleString()}</p>

            <div className="qty-box">
              <button onClick={() => decrease(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>

            <button className="delete-btn" onClick={() => removeItem(item.id)}>
              Hapus
            </button>
          </div>
        </div>
      ))}

      <div className="summary">
        <h2>Total: Rp {total.toLocaleString()}</h2>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
