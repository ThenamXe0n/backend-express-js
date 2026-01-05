import axios from "axios";
export async function getAllProductsAPI() {
  try {
    let response = await axios.get("http://localhost:8080/api/product/getAll");
    let data = response.data.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
