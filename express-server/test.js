import axios from "axios"
// async function getProducts() {
//   try {
//     const response = await fetch("https://www.dummyjson.com/products");
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getQuote() {
  try {
    let response = await axios.get("http://localhost:8080/quotes");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    alert(error.message);
  }
}

// getProducts();
