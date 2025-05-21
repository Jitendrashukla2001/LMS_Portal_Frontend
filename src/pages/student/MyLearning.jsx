import { useLoadUserQuery } from '@/features/api/authapi';
import React from 'react'
import Course from './Course';

const MyLearning=()=>
{
    const {data,isLoading}=useLoadUserQuery();
    const user = data && data.user;
    console.log(user)
    // const isLoading = false;
    const MyLearningCourses=[];
    return (
        <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
            <h1 className='font-bold text-2xl'>MY LEARNING</h1>
            <div className='my-5' disabled={isLoading}>
                {
                    isLoading ? ( <MyLearningSkeleton />) :user.enrolledCourses.length===0 ?(<p>You are not enrolled in any Courses</p>):(<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>{user.enrolledCourses.map((course)=>(<Course key={course._id} course={course}></Course>))}</div>)
                }
            </div>
        </div>
    )
}

export default MyLearning

const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );

