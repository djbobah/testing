const jwt = require("jsonwebtoken");
const config = require("config");
const model = require("../models");

const Token = model.Tokens;

class TokenService {
  //return accessToken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));
    return { accessToken, refreshToken, expiresIn: 7200 };
  }
  async save(userId, refreshToken) {
    const data = await Token.findOne({ where: { userId: userId } });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({
      userId: userId,
      refreshToken: refreshToken,
    });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }
  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({
        where: { refreshToken: refreshToken },
      });
    } catch (error) {
      return null;
    }
  }
}
module.exports = new TokenService();
