const jwt = require("jsonwebtoken");
const config = require("config");

function createToken(userFromDB) {
  const token = jwt.sign(
    { id: userFromDB.id, role: userFromDB.role },
    config.get("secret"),
    {
      expiresIn: 86400,
    }
  );
  return token;
}

function verifyToken(req, res, next) {
  // let token;

  // if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["authorization"] && req.headers["authorization"].length) {
    // if (token)
    // token = req.headers["authorization"];
    const token = req.headers["authorization"].replace(/(bearer|jwt)\s+/i, "");
    jwt.verify(token, config.get("secret"), (err, decodedToken) => {
      if (err) {
        // res.status(401).json({ error: "Ошибка аутентификации..." });
        return next({ message: "Ошибка аутентификации...", statusCode: 401 });
      }
      req.credentials = { id: decodedToken.id, role: decodedToken.role };
      next();
    });
  } else {
    req.credentials = { role: "guest" };
    next();
  }
}

module.exports = { createToken, verifyToken };
