import Joi, { valid } from "joi";
import BaseDto from "../../common/config/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .message("password must me 8 character")
            .min(8).required(),
        role:Joi.string().valid("customer","seller").default("customer")
    })
}

export default RegisterDto