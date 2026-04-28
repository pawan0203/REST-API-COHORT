import * as authservice from "./auth.services"
import ApiResponse from "../../../common/config/utils/api-response"


const register = async () => {
    const user = await authservice.register(requestAnimationFrame.body)
    ApiResponse.created(res, "Registration success", user)
    
}


export { register }
