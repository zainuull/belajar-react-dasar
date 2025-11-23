const Product =() =>{
    const products = [
    {
      id: 1,
      name: "angkot DJ",
      price: "Rp 45.000.000",
      img: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/10/04_911_gt3_static.jpg",
    },
    {
      id: 2,
      name: "Angkot hejo",
      price: "Rp 60.000.000",
      img: "https://wallpapercave.com/wp/wp15057382.webp",
    },
    {
      id: 3,
      name: "Angkot helloworld",
      price: "Rp 750.000",
      img: "",
    },
  ];
    return (
    <div className="product-page">
      <h1>Daftar Produk</h1>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img 
            src={item.img} 
            alt={item.name} 
            style={{
        width: "60%",
        height: "300px",
        objectFit: "cover",
        borderRadius: "10px"
      }}/>

            <div className="info">
              <h2>{item.name}</h2>
              <p>{item.price}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Product;