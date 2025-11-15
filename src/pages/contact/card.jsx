const Card = (props) => {
  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        backgroundColor: "green",
      }}
    >
      <img
        src={props.img}
        style={{
          width: "170px",
          height: "170px",
          objectFit: "cover",
        }}
      />
      <div>
        <h5>{props.nama || "BAJU"}</h5>
        <p>Harga: {props.harga || "Rp.0"}</p>
      </div>
    </div>
  );
};

export default Card;
