import Navbar from "../navbar";
import Card from "./card";
const dataProducts = [
  {
    id: "1",
    nama: "Samsung Z Fold 5",
    harga: "Rp. 20.000",
    img: "https://factorybox.in/cdn/shop/files/Untitled-1_e7805dad-a183-4876-8e9d-b3bac6807d39.png?v=1726299073&width=416",
  },
  {
    id: "2",
    nama: "Xiaomi 15 Ultra",
    harga: "Rp. 40.000",
    img: "https://i02.appmifile.com/221_item_id/28/02/2025/335095bb2e6b2df640c3855872fda99c!800x800!85.png",
  },
  {
    id: "3",
    nama: "Baju Spiderman",
    harga: "Rp. 100.000",
    img: "https://down-id.img.susercontent.com/file/id-11134201-23020-fs7y0r55jynv28",
  },
];

const Contact = () => {
  // Kode JS

  // Kode HTML
  return (
    <div>
      <h1>Contact</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {/* Cara Baru / Cepet */}
        {dataProducts.map((data, index) => {
          return <Card img={data.img} nama={data.nama} harga={data.harga} />;
        })}

        {/* Cara Lama */}
        <Card
          img="https://images.samsung.com/is/image/samsung/p6pim/id/2108/gallery/id-galaxy-z-fold3-f926-5g-sm-f926bzsdxid-474133463?$684_547_PNG$"
          nama="Samsung Z Fold 3"
          harga="Rp. 10.000"
        />
        <Card
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU6-gKttVg8SxeGVh_b1TvJYtwgdmgMyc0ag&s"
          nama="Xiaomi 15"
          harga="Rp. 20.000"
        />
        <Card
          img="https://e7.pngegg.com/pngimages/100/1/png-clipart-the-amazing-spider-man-costume-superhero-child-spiderman-face.png"
          nama="Baju Spiderman"
          harga="Rp.100.000"
        />
      </div>
    </div>
  );
};

export default Contact;
