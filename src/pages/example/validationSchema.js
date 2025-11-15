import * as Yup from "yup";

// export untuk function
export const validationSchema = Yup.object({
  nama: Yup.string().required("Nama wajib di isi"),
  email: Yup.string().required("Email wajib di isi"),
  password: Yup.string().required("Password wajib di isi"),
  ktp: Yup.string().required("KTP Wajib di isi"),
});

// export untuk component (yg ada html nya)
// export default validationSchema
