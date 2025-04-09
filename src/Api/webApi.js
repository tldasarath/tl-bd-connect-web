import axiosInstance from "./AxiosInstace";

export const getService =async()=>{
    try {        
        const response = await axiosInstance.get('/category/get-service')
        return response
    } catch (error) {
        console.error(error);
        
    }
}
export const getProduct =async()=>{
    try {
        const response = await axiosInstance.get('/category/get-product')
        return response
    } catch (error) {
        console.error(error);
        
    }
}
export const getBusiness =async()=>{
    try {
        const response = await axiosInstance.get('/category/get-business')
        return response
    } catch (error) {
        console.error(error);
        
    }
}
export const getSlider =async()=>{
    try {
        const response = await axiosInstance.get('/slider/get-all-sliders')
        return response
    } catch (error) {
        console.error(error);
        
    }
}
export const addEnquiry =async(enquiryData)=>{
    try {
        const response = await axiosInstance.post('/enquiry/add-enqiuires',enquiryData)
        return response
    } catch (error) {
        console.error(error);
        
    }
}