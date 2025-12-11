const { quotesData } = require("../data");

function fetchAllQuotes(req, res) {
  let start = req?.query?.skip > 0 ? parseInt(req?.query?.skip) : 0;
  let itemPerPage = req.query.limit || 10;
  console.log("start", start);
  console.log("query ", req.query);
  let dataToSend = quotesData.slice(start, start + parseInt(itemPerPage));

  const filteredData = quotesData.filter((quote) => {
    return quote.author.toLowerCase().includes(req.query.author);
  });
  console.log(filteredData)

  if(filteredData.length>0){
    dataToSend = filteredData
  }

  res.json({
    quotes: dataToSend,
    total: dataToSend.length,
    skip: +start,
    limit: parseInt(itemPerPage),
  });
}

module.exports = { fetchAllQuotes };
