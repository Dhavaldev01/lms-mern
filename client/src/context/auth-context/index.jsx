
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate : false,
    user : null
  });

  const [loading , setLoading] = useState(true);

  async function handleRegisterUser(e) {
    // A bhi use kari Sakay
    // const data = await axiosInstance.post("/auth/register", {
    //   ...signUpFormData,
    //   role: "user",
    // });
    
    e.preventDefault();
    const data = await registerService(signUpFormData);
    
    // console.log(data);
  }

  async function handleLoginUser(e) {

    e.preventDefault();
    const data = await loginService(signInFormData);
    
    sessionStorage.setItem("accessToken" , JSON.stringify(data.data.accessToken))
    if(data.success){
      setAuth({
        authenticate : true,
        user: data.user
      })
    }else{
      setAuth({
        authenticate : false,
        user: null
      });
    }
    // console.log(data);
  }

  // Check Auth User 
  async function checkAuthUser(){
    try {
      const data = await checkAuthService();
      console.log("Authservice Data : " , data);
  
      if(data.success){
        setAuth({
          authenticate : true,
          user: data.data.user
        })
        setLoading(false);
        // console.log("Auth 1: " , auth);
      }else {
        setAuth({
          authenticate : false,
          user: null,
        });
        setLoading(false);
        // console.log("Auth 2 : " , auth);
      }
    } catch (error) {
      console.log(error);
      if(!error?.response?.data?.success){
        setAuth({
          authenticate : false,
          user: null,
        });
        setLoading(false); 
      }
    }   
  }

  function resetCredentials(){
    setAuth({
      authenticate: false,
      user:null
    })
  }
  useEffect(()=> {
    checkAuthUser();
  },[])
  // console.log(auth)

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials
      }}
    >
      {
        loading ? <Skeleton/> : children
      }
    </AuthContext.Provider>
  );
}
