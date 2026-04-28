import ApiError from "../../common/config/utils/api-error.js"
import User from "./auth.model.js"
import {generateResetToken, genrateAccessToken, genrateRefreshToken, verifyRefreshToken} from "../../common/utils/jwt.utils.js"
import validate from "../../common/config/middleware/validate.middleware.js";

const hashToken = (token) =>
    crypto.createHash("sha256").update(rawToken).digest("hex");



const register = async({ name, email, password, role })=> {
    const existing = await user.findOne({ email })
    if (existing) throw ApiError.conflict("Email already exists")
    
    const { rawToken, hashedToken } = generateResetToken
    
    await user.create({
        name,
        email,
        password,
        role,
        verificationtoken: hashedToken
    })
    // todo: send a email to user with token : rawtoken

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationtoken

    return userObj
}

const login = async ({ email, password }) => {
    //  Take email and find user in DB
    // Then check if password is correct
    // Check if verified or not

    const user = await user.findOne({ email }).select("+password")
    if (!user) throw ApiError.unauthorized("Invalid email and password")
    // somehow i check password
    
    if (!user.isVerified) {
        throw ApiError.forbidden("Please verify user")
    }

    const accessToken = genrateAccessToken({ id: user._id, role: user.role })
    const refreshToken = genrateRefreshToken({ id: user._id })
    
    user.refreshToken = hashToken(refreshToken)
    await user.save({ validateBeforeSave: false })
    
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return { user: userObj, accessToken, refreshToken }
}


const refresh = async (token)=>{
    if (!token) throw ApiError.unauthorized("Refresh token missing")
    verifyRefreshToken(token)
}


// continue 2.09 

export {register}