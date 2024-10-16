import axiosInstance from "@/api/axiosinstance";


export async function registerService(formData){
    const {data} = await axiosInstance.post("/auth/register", {
        ...formData,
        role: "user",
      })
      return data;
}