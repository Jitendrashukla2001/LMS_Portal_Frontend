import { authApi } from "@/features/api/authapi";
import { CourseApi } from "@/features/api/CourseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { PurchaseCourseApi } from "@/features/api/PurchaseCourseApi";
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer";

export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,CourseApi.middleware,PurchaseCourseApi.middleware,courseProgressApi.middleware)
});

const intializeApp=async ()=>{
   await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
intializeApp();