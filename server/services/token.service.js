const jwt = require("jsonwebtoken");
const config = require("config");
const model = require("../models");

const Token = model.Tokens;

class TokenService {
  //return accessToken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));
    return { accessToken, refreshToken, expiresIn: 3600 };
  }
  async save(userId,refreshToken)
}
module.exports = new TokenService();
