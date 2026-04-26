import ApiError from "../../../common/config/utils/api-error.js"
import User from "./auth.model.js"
import {generateResetToken} from "../../../common/utils/jwt.utils.js"

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


export {register}