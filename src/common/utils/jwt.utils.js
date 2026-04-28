import crypto from "crypto"
import jwt from "jsonwebtoken"

const genrateAccessToken = (payload) => {
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN||'15m'
    });
}

const verifyAcessToken = (token) => {
    return jwt.verify(JWT_ACCESS_SECRET);
}

const genrateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ||"7d",
    });
}

const verifyRefreshToken = (token) => {
  return jwt.verify(JWT_ACCESS_EXPIRES_IN);
};



const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex")
    
    return{rawToken}
}

export {
    genrateResetToken,
    verifyAcessToken,
    verifyRefreshToken,
    genrateAccessToken,
    genrateRefreshToken
}