// 3 
// -->Routes once loggedin i will go back to login page
// -->if not loggin then can't see any courses
// -->if student then should access the admin-dashboard kind URL on admin can access it

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute=({children})=>{
    const {isAuthenticated}=useSelector(store=>store.auth)
    if(!isAuthenticated)
    {
        return <Navigate to="/login"></Navigate>
    }
    return children;
}

export const AuthenticatedUser=({children})=>{
   const {isAuthenticated}=useSelector(store=>store.auth)
   if(isAuthenticated)
   {
    return <Navigate to="/"></Navigate>
   }
   return children;
}

export const AdminRoute=({children})=>{
    const {user,isAuthenticated}=useSelector(store=>store.auth)
    if(!isAuthenticated)    
    {
     return <Navigate to="/login"></Navigate>
    }
    if(user?.role !=="instructor")
    {
        return <Navigate to="/"></Navigate>
    }
    return children
}
