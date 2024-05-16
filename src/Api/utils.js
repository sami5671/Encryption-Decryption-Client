import axios from "axios";
import axiosSecure from ".";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data;
};

// send encrypted data to database
export const postEncryptedData = async (encryptedData) => {
  const { data } = await axiosSecure.post("/encryptedData", encryptedData);
  return data;
};

// get encrypted data from database
export const getEncryptedData = async () => {
  const { data } = await axiosSecure.get("/encryptedData");
  return data;
};
