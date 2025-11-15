import { useLocation } from "react-router-dom";

const Detail = () => {
  const { state } = useLocation();
  const data = state?.data;
  console.log("data", data);
  return (
    <div>
      <h1>Detail : {data?.title}</h1>
      <img src={data?.image} />
      <p>Deskripsi</p>
      <p>{data?.description}</p>
    </div>
  );
};

export default Detail;
