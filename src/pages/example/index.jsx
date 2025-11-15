import { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";

const Example = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const calculation = (number) => {
    console.log("hitung ulang");
    let result = 0;
    for (let index = 0; index < 1000000000; index++) {
      result += index * number;
    }
    return result;
  };

  // tanpa useMemo
  // const hasil = calculation(count);

  // dengan useMemo
  // const hasil = useMemo(() => calculation(count), [count]);

  // useFormik
  const formik = useFormik({
    initialValues: {
      nama: "", // field / key nama
      password: "", // field / key password
      email: "",
      ktp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // INTEGRASI API POST
      if (values._id) {
        updateData(values);
      } else {
        postData(values);
      }
    },
  });

  const postData = (values) => {
    axios
      .post(
        "https://crudcrud.com/api/b3c354d772384ec7a831d7203d8904a9/users",
        values
      )
      // jika berhasil
      .then((res) => {
        window.location.reload();
      })
      // jika gagal
      .catch((error) => {
        console.log("error", error);
      });
  };

  const updateData = (values) => {
    const { _id, ...py } = values;
    axios
      .put(
        `https://crudcrud.com/api/b3c354d772384ec7a831d7203d8904a9/users/${values._id}`,
        py
      )
      .then((res) => {
        console.log("res", res);
        getData();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getData = () => {
    axios
      .get("https://crudcrud.com/api/b3c354d772384ec7a831d7203d8904a9/users/")
      // jika berhasil
      .then((res) => {
        setData(res.data);
      })
      // jika gagal
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (user) => {
    // Hapus semua toast aktif biar ga numpuk
    toast.dismiss();

    const confirmToast = toast.info(
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            onClick={async () => {
              toast.dismiss(confirmToast); // Tutup konfirmasi

              try {
                await axios.delete(
                  `https://crudcrud.com/api/b3c354d772384ec7a831d7203d8904a9/users/${user._id}`
                );
                toast.success("Data berhasil dihapus ✅");
                getData();
              } catch (error) {
                console.error("error", error);
                toast.error("Gagal menghapus data ❌");
              }
            }}
            style={{
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Ya, hapus
          </button>

          <button
            onClick={() => toast.dismiss(confirmToast)}
            style={{
              background: "#ccc",
              color: "#000",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Batal
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // biar ga auto hilang
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleUpdate = (user) => {
    // console.log("user", user);
    formik.setValues({
      ...user,
    });
    // formik.setValues({
    //   nama: user.nama,
    //   email: user.email,
    //   password: user.password,
    //   ktp: user.ktp,
    // });
  };

  // debug
  // console.log("formik", formik.values);
  // console.log("errors", formik.errors);
  // console.log("data", data);
  /*
  ... = destructuring
  */

  return (
    <div>
      {/* <h1>Hasil: {hasil}</h1>
      <button onClick={() => setCount(count + 1)}>Tambah</button> */}
      {/* USE CASE FORMIK */}
      <div>
        <p>Nama</p>
        <input
          name="nama"
          onChange={formik.handleChange}
          placeholder="Masukkan nama anda"
          value={formik.values.nama}
        />
        <p style={{ color: "red" }}>{formik.errors.nama}</p>

        <p>Email</p>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          placeholder="Masukkan email anda"
          value={formik.values.email}
        />
        <p style={{ color: "red" }}>{formik.errors.email}</p>

        <p>Password</p>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          placeholder="Masukkan password anda"
          value={formik.values.password}
        />
        <p style={{ color: "red" }}>{formik.errors.password}</p>

        <p>KTP</p>
        <input
          name="ktp"
          onChange={formik.handleChange}
          type="file"
          accept=".pdf, .png"
        />
        <p style={{ color: "red" }}>{formik.errors.ktp}</p>
      </div>
      <button type="submit" onClick={formik.handleSubmit}>
        {formik.values._id ? "Perbarui" : "Register"}
      </button>

      <div>
        <h1>Daftar User</h1>
        {/* TABLE USER */}
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr className="bg-white p-4">
                <th>Nama</th>
                <th>Email</th>
                <th>KTP</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.ktp}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(user)}
                        className="btn-delete"
                      >
                        Hapus
                      </button>
                      <button onClick={() => handleUpdate(user)}>Update</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* {data.map((user, index) => {
          return (
            <div key={index}>
              <p>Nama: {user.nama}</p>
              <p>Email: {user.email}</p>
              <p>KTP: {user.ktp}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Example;
