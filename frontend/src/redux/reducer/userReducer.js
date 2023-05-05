import { createReducer } from "@reduxjs/toolkit";

export const userReducer=createReducer({user :{}},{
    loginRequest :(state)=>{
        state.loading=true;
        state.isAuthenticated =false;
    },
    loginSuccess : (state,action)=>{
        state.loading=false;
        state.isAuthenticated =true;
        state.user=action.payload;
        
    },
    loginFail :(state,action)=>{
        state.loading=false;
        state.isAuthenticated =false;
        state.user=null;
        state.error=action.payload;
    },
    registerRequest :(state)=>{
        state.loading=true;
        state.isAuthenticated =false;
    },
   registerSuccess : (state,action)=>{
        state.loading=false;
        state.isAuthenticated =true;
        state.user=action.payload;
        
    },
    registerFail :(state,action)=>{
        state.loading=false;
        state.isAuthenticated =false;
        state.user=null;
        state.error=action.payload;
    },
    loadUserRequest :(state)=>{
        state.loading=true;
        state.isAuthenticated =false;
    },
    loadUserSuccess : (state,action)=>{
        state.loading=false;
        state.isAuthenticated =true;
        state.user=action.payload;
        
    },
    loadUserFail :(state,action)=>{
        state.loading=false;
        state.isAuthenticated =false;
        state.user=null;
        state.error=action.payload;
    },
    logoutSuccess :(state)=>{
        state.loading=false;
        state.isAuthenticated =false;
        state.user=null;
    },
    logoutFail :(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//update profile
export const profileReducer=createReducer({},{
    updateProfileRequest :(state)=>{
        state.loading=true;
       
    },
    updateProfileSuccess : (state,action)=>{
        state.loading=false;
        
        state.isUpdated=action.payload;
        
    },
    updateProfileFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
    updateProfileReset :(state)=>{

        state.isUpdated =false;
    
    },

    updatePasswordRequest :(state)=>{
        state.loading=true;
       
    },
    updatePasswordSuccess : (state,action)=>{
        state.loading=false;
        
        state.isUpdated=action.payload;
        
    },
    updatePasswordFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
   updatePasswordReset :(state)=>{

        state.isUpdated =false;
    
    },
    updateUserRequest :(state)=>{
        state.loading=true;
       
    },
    updateUserSuccess : (state,action)=>{
        state.loading=false;
        
        state.isUpdated=action.payload;
        
    },
    updateUserFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
    updateUserReset :(state)=>{

        state.isUpdated =false;
    
    },
    deleteUserRequest :(state)=>{
        state.loading=true;
       
    },
    deleteUserSuccess : (state,action)=>{
        state.loading=false;
        
        state.isDeleted=action.payload.success;
        state.message =action.payload.message;
        
    },
    deleteUserFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
    deleteUserReset :(state)=>{

        state.isDeleted =false;
    
    },
    clearError : (state)=>{
        state.error=null;
      },

})

//forgot password
export const forgotPasswordReducer=createReducer({},{
    forgotPasswordRequest :(state)=>{
        state.loading=true;
       state.error=null;
    },
    forgotPasswordSuccess : (state,action)=>{
        state.loading=false;
        
        state.message=action.payload;
        
    },
    forgotPasswordFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
     clearError : (state)=>{
        state.error=null;
      },
    }
)

//all user admin
export const allUserReducer=createReducer({users:[]},{
    allUserRequest :(state)=>{
        state.loading=true;
     
    },
    allUserSuccess : (state,action)=>{
        state.loading=false;
        
        state.users=action.payload;
        
    },
    allUserFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
     clearError : (state)=>{
        state.error=null;
      },
    }
)

// user details admin
export const userDetailsReducer=createReducer({user :{}},{
    userDetailsRequest :(state)=>{
        state.loading=true;
     
    },
    userDetailsSuccess : (state,action)=>{
        state.loading=false;
        
        state.user=action.payload;
        
    },
    userDetailsFail :(state,action)=>{
        state.loading=false;
    
        state.error=action.payload;
    },
     clearError : (state)=>{
        state.error=null;
      },
    }
)