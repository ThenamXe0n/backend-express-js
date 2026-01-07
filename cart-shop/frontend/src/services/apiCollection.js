import axios from "axios";
import axiosInstance from "./axiosInstance";
export async function getAllProductsAPI() {
  try {
    let response = await axios.get("http://loca/api/product/getAll");
    let data = response.data.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

// ========product apis ==================

// --get--
export async function fetchALLProductAPI() {
  try {
    let response = await axiosInstance.get("/api/product/getAll");
    let data = response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
//--post--
