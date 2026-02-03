import axios from "axios";
import axiosInstance from "./axiosInstance";
import { apiPaths } from "./apiEndPoints";
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
export async function fetchApprovedProductAPI() {
  try {
    let response = await axiosInstance.get(apiPaths.fetchApprovedProducts);
    let data = response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchSingleProductByProductCodeAPI(productCode) {
  try {
    const response = await axiosInstance.get(
      `${apiPaths.fetchSingleProductByProductCode}${productCode}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
//--post--

// ========================= user APIS =========================
export async function fetchLoggedInUserDetailsAPI() {
  try {
    let response = await axiosInstance.get(apiPaths.fetchLoggedInUserDetails);
    let data = response.data;
    if (data.status) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// ================================cart api=========================
export async function addItemToCartAPI(itemDetails) {
  try {
    const response = await axiosInstance.post(apiPaths.cartEndPoint, {
      item: itemDetails._id,
      quantity: itemDetails.qunatity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getUserCartItemsAPI() {
  try {
    const response = await axiosInstance.get(apiPaths.cartEndPoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}


