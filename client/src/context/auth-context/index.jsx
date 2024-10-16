
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services/indev";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  async function handleRegisterUser(e) {
    // A bhi use kari Sakay
    // const data = await axiosInstance.post("/auth/register", {
    //   ...signUpFormData,
    //   role: "user",
    // });
    
    e.preventDefault();

    const data = await registerService(signUpFormData);
    console.log(data);
  }

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
