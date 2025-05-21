import { Button } from '@/components/ui/button'
import BuyCourseButton from '@/components/ui/BuyCourseButton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/PurchaseCourseApi'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'

function CourseDetails() {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const [status, setstatus] = useState(false);
  const [coupons, setcoupons] = useState("");
  console.log(data)
  if (isLoading) return <h1>Loading ....</h1>
  if (isError) return <h1>failed to load the data</h1>
  const course = data.course;
  const purchased = data.purchased;
  // console.log(purchased);
  console.log(course)
  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`)
    }
  }
  
  const Handlestatus = () => {
    setstatus(true)
  }
  const ApplyCoupon = (e) => {

    if (coupons.trim() ==="") {
       window.location.reload();
      setstatus(false);
      
    } else {
      alert(coupons)
      setstatus(true);
    }

  }

  // useEffect(() => {
  //     if (status === false) {
  //       alert(status);
  //     }
  //   }, [status]);
  console.log(status)
 
  // console.log(courseId)
  return (
    <div className='mt-20 space-y-5'>
      <div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>Course Title :{course.courseTitle}</h1>
          <p className='text-base md:text-lg'>Course Sub title</p>
          <p>Created by:{" "} <span className='text-[#C0C4FC] underline italic'>{course.creator.name}</span></p>
          <div className='items-center text-sm'>
            <BadgeInfo size={16}></BadgeInfo>
            <p>Last updated {course.createdAt.split('T')[0]} </p>
          </div>
          <p>Student enrolled:{course.enrolledStudents.length}</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm' dangerouslySetInnerHTML={{ __html: course.description }} />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                4 lecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {
                course.lectures.map((lecture, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span>
                      {
                        false ? (<PlayCircle size={14}></PlayCircle>) : <Lock size={14}></Lock>
                      }
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </div>
        <div className='w-full lg:w-1/3'>
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className='w-full aspect-video mb-3'>
                <ReactPlayer width="100%" height={"100%"} url={course.lectures[0].videoUrl} controls={true} ></ReactPlayer>
              </div>
              <h1>Lecture Title: {course.courseTitle}</h1>
              <Separator className="my-2"></Separator>
              <h1 className='text-lg md:text-xl font-semibold'>Course Price :<span className='text-lg font-bold'>₹ {course.coursePrice}</span></h1>
              <button onClick={Handlestatus} className="items-left mt-2 outline-none border-0 text-sm font-bold bg-tranparent text-color-black">{status ? (<><input type="text" className='font-bold border-2' value={coupons} onChange={(e) =>setcoupons(e.target.value)} placeholder='Coupon'></input><button onClick={ApplyCoupon}>Apply</button></>) : ("Apply coupons?")}</button>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (<Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>) : (<BuyCourseButton courseId={courseId}></BuyCourseButton>)}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails