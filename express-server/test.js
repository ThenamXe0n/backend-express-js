async function getProducts (){
    try{
        const response =  await fetch("https://www.dummyjson.com/products")
        const data = await response.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

getProducts()