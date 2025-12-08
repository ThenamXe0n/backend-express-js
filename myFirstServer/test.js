async function getProducts() {
  try {
    let response = await fetch("http://localhost:8080/products");
    let data = await response.json();
    console.log(data);
    console.log(response);
  } catch (error) {
    console.log("error is :", error);
  }
}
getProducts()