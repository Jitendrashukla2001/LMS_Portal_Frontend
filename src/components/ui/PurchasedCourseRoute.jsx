
import { useGetCourseDetailWithStatusQuery } from "@/features/api/PurchaseCourseApi";
import { Navigate,useParams } from "react-router-dom";

const PurchaseCourseProtectedRoute=({children})=>{
    const {courseId}=useParams();
    console.log(courseId)
    const {data,isLoading}=useGetCourseDetailWithStatusQuery(courseId);
    if(isLoading) return <p>Loading...</p>
    // console.log(data.purchased)
    return data?.purchased ? children :<Navigate to={`/course-details/${courseId}`}></Navigate>;
   
}

export default PurchaseCourseProtectedRoute;