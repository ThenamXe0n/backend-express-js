const fetchServerInformation = (req, res) => {
  res.status(200);
  res.send({
    server: "express js",
    level: "low",
    apiEndPoints: 2,
    apiMethods: ["GET", "POST"],
  });
};

const healthCheck = (req, res) => {
  res.status(200);
  res.send(
    `<h1>welcome to the server</h1>
    <table style="border:1px solid black; border-collapse:collapse;">
    <tr style="border:1px solid black">
     <td style="border:1px solid black">status</td>
     <td style="border:1px solid black">value</td>
    </tr>
    <tr style="border:1px solid black">
    <td style="border:1px solid black">200</td>
    <td style="border:1px solid black" >Ok</td>
    </tr>
    </table>`
  );
};

module.exports = { fetchServerInformation, healthCheck };
