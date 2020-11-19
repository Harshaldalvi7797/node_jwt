const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.json({
    message: "welcome to api"
  });
});
// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({ message: "post created" });
//     }
//   });
// });
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
});
app.post("/api/login", (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "harsh",
    email: "h@gmail.com"
  };
  jwt.sign(
    {
      user
    },
    "secretkey",
    (err, token) => {
      res.json({
        token
      });
    }
  );
});
//verify token

// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.header["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
//}
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
app.listen(port, () => {
  console.log(`connect on ${port}`);
});
