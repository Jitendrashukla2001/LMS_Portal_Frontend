import { authApi } from "@/features/api/authapi";
import { CourseApi } from "@/features/api/CourseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { PurchaseCourseApi } from "@/features/api/PurchaseCourseApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const rootReducer=combineReducers({
  [authApi.reducerPath]:authApi.reducer,
  [CourseApi.reducerPath]:CourseApi.reducer,
  [PurchaseCourseApi.reducerPath]:PurchaseCourseApi.reducer,
  [courseProgressApi.reducerPath]:courseProgressApi.reducer,
  auth:authReducer
})

export default rootReducer;