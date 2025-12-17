const healthCheck = (req, res) => {
  res.send(
    `<h1 style="text-align:center;font-size:5rem"> server is healthy and alive</h1>`
  );
};

module.exports = { healthCheck };
