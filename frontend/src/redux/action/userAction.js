import axios from "axios"

export const login=(email,password)=>async(dispatch)=>{

    try {
        dispatch({
            type :"loginRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.post("/api/v1/login",{email,password},config);
           dispatch({
            type :"loginSuccess",
            payload :data.user,
        })

    } catch (error) {
        dispatch({
            type :"loginFail",
            payload :error.response.data.message
        })
    }
 }

//register user
export const register=(userData)=>async(dispatch)=>{

    try {
        dispatch({
            type :"registerRequest",
           })
           const config={
            headers:{"Content-Type" : "multipart/form-data"}
           }
           const {data}=await axios.post("/api/v1/register",userData,config);
           dispatch({
            type :"registerSuccess",
            payload :data.user,
        })

    } catch (error) {
        dispatch({
            type :"registerFail",
            payload :error.response.data.message
        })
    }
 }
 
 //LoadUser
 
export const loadUser=()=>async(dispatch)=>{

    try {
        dispatch({
            type :"loadUserRequest",
           })
          const {data}=await axios.get("/api/v1/me");
           dispatch({
            type :"loadUserSuccess",
            payload :data.user,
        })

    } catch (error) {
        dispatch({
            type :"loadUserFail",
            payload :error.response.data.message
        })
    }
 }

 //logout
  
export const logout=()=>async(dispatch)=>{

    try {
        
          await axios.get("/api/v1/logout");
           dispatch({
            type :"logoutSuccess",
        
        })

    } catch (error) {
        dispatch({
            type :"logoutFail",
            payload :error.response.data.message
        })
    }
 }

 //update profile
export const updateProfile=(userData)=>async(dispatch)=>{

    try {
        dispatch({
            type :"updateProfileRequest",
           })
           const config={
            headers:{"Content-Type" : "multipart/form-data"}
           }
           const {data}=await axios.put("/api/v1/me/update",userData,config);
           dispatch({
            type :"updateProfileSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"updateProfileFail",
            payload :error.response.data.message
        })
    }
 }



 //update password
 export const updatePassword=(passwords)=>async(dispatch)=>{

    try {
        dispatch({
            type :"updatePasswordRequest",
           })
           const config={
            headers:{"Content-Type" : "multipart/form-data"}
           }
           const {data}=await axios.put("/api/v1/password/update",passwords,config);
           dispatch({
            type :"updatePasswordSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"updatePasswordFail",
            payload :error.response.data.message
        })
    }
 }


 
/////////////////////
//forgot password
export const forgotPassword=(email)=>async(dispatch)=>{

    try {
        dispatch({
            type :"forgotPasswordRequest",
           })
           const config={
            headers:{"Content-Type" : "application/json"}
           }
           const {data}=await axios.post("/api/v1/password/forgot",email,config);
           dispatch({
            type :"forgotPasswordSuccess",
            payload :data.message,
        })
  
    } catch (error) {
        dispatch({
            type :"forgotPasswordFail",
            payload :error.response.data.message
        })
    }
  }


 //get all users admin
 
 export const getAllUsers=()=>async(dispatch)=>{

    try {
        dispatch({
            type :"allUserRequest",
           })
          const {data}=await axios.get("/api/v1/admin/users");
           dispatch({
            type :"allUserSuccess",
            payload :data.users,
        })

    } catch (error) {
        dispatch({
            type :"allUserFail",
            payload :error.response.data.message
        })
    }
 }

 //get  user details admin
 
 export const getUserDetails=(id)=>async(dispatch)=>{

    try {
        dispatch({
            type :"userDetailsRequest",
           })
          const {data}=await axios.get(`/api/v1/admin/user/${id}`);
           dispatch({
            type :"userDetailsSuccess",
            payload :data.user,
        })

    } catch (error) {
        dispatch({
            type :"userDetailsFail",
            payload :error.response.data.message
        })
    }
 }


 //update user admin
 export const updateUser=(id,userData)=>async(dispatch)=>{

    try {
        dispatch({
            type :"updateUserRequest",
           })
           const config={
            headers:{"Content-Type" : "multipart/form-data"}
           }
           const {data}=await axios.put(`/api/v1/admin/user/${id}`,userData,config);
           dispatch({
            type :"updateUserSuccess",
            payload :data.success,
        })

    } catch (error) {
        dispatch({
            type :"updateUserFail",
            payload :error.response.data.message
        })
    }
 }

//delete user admin
export const deleteUser=(id)=>async(dispatch)=>{

    try {
        dispatch({
            type :"deleteUserRequest",
           })
          
        
           const {data}=await axios.delete(`/api/v1/admin/user/${id}`);
           dispatch({
            type :"deleteUserSuccess",
            payload :data,
        })

    } catch (error) {
        dispatch({
            type :"deleteUserFail",
            payload :error.response.data.message
        })
    }
 }


 //action to clear error
 export const clearError=()=>async(dispatch)=>{
    dispatch({
        type :"clearError",
       })
 }