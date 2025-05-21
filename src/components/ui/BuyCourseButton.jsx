import { useCreateCheckoutSessionMutation } from '@/features/api/PurchaseCourseApi'
import { Loader2 } from 'lucide-react';
import React,{useEffect} from 'react'
import { Button } from './button'
// import { meta } from '@eslint/js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BuyCourseButton({ courseId}) {
    const navigate=useNavigate();

    const [createCheckoutSession, {isLoading,isError,isSuccess}] = useCreateCheckoutSessionMutation();
    // console.log(data)
    // console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
    const purchaseCourseHandler = async () => {
        try {
            const { data } = await createCheckoutSession(courseId);
            console.log(data)

            const { order, purchaseId } = data;

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;

            script.onload = () => {
                const razorpay = new window.Razorpay({
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // or directly use test key
                    amount: order.amount,
                    currency: order.currency,
                    name: "Course Purchase",
                    description: "Buy a course",
                    order_id: order.id,
                    handler: async (response) => {
                        console.log(response)
                        // After payment, verify it
                        await axios.post(
                            "http://localhost:9001/api/v1/purchase/verify-payment",
                            {
                              razorpay_payment_id: response.razorpay_payment_id,
                              razorpay_order_id: response.razorpay_order_id,
                              razorpay_signature: response.razorpay_signature,
                              purchaseId,
                            },
                            {
                              withCredentials: true, // 👈 this ensures cookies are sent with the request
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );

                        alert("✅ Payment successful and course enrolled!");
                        // Optionally redirect or reload page
                    },
                    prefill: {
                        name: "Student",
                        email: "student@example.com",
                    },
                    theme: {
                        color: "#2D2F31",
                    },
                });

                razorpay.open();
            };

            document.body.appendChild(script);
        } catch (error) {
            console.error(error);
            alert("❌ Payment initiation failed.");
        }
    }
    useEffect(() => {
        
    }, [isSuccess,isError]);

    return (

        <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
            {
                isLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please wait...</Loader2></>) : "Purchase Course"
            }
        </Button>

    )
}

export default BuyCourseButton