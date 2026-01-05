function generateProductCode() {
  let uniqueNo = Date.now();
  let prefix = "Prod";
  let generatedCode = prefix +"_"+ uniqueNo;
  return generatedCode;
}

export default generateProductCode