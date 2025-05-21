import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_COURSE_API = "http://localhost:9001/api/v1/purchase";

export const PurchaseCourseApi=createApi({
    reducerPath:"PurchaseCourseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:PURCHASE_COURSE_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        //now there will be api
        createCheckoutSession:builder.mutation({
            query:(courseId)=>({
                url:"/checkout/create-checkout-session",
                method:"POST",
                body:{courseId}
            })
        }),
        getCourseDetailWithStatus:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/details-with-status`,
                method:"GET"
            })
        }),
        getPurchasedCourse:builder.query({
            query:(courseId)=>({
                url:`/`,
                method:"GET"
            })
        })

    })
})

export const {useCreateCheckoutSessionMutation,useGetCourseDetailWithStatusQuery,useGetPurchasedCourseQuery}=PurchaseCourseApi;