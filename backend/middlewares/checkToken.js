const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = require("../config.json");

module.exports.checkToken = async (req, res, next) => {
  const token = req.get("authorization");

  try {
    const tokenHeader = req.get("authorization");
    if (!tokenHeader) throw new Error(`No JWT found`);
    const token = tokenHeader.split(" ")[1];
    console.log(token, "token");
    const decoded = jwt.verify(token, PRIVATE_KEY);
    if (!decoded) throw new Error(`you arenot authroized to access`);
    req.token = decoded;
    next();
  } catch (e) {
    next(e);
  }
};
