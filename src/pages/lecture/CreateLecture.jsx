import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/CourseApi'
import { Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'
function CreateLecture() {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.CourseId;
    const [lectureTitle, setlectureTitle] = useState("")
    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: lectureLoading, isError: lectureError,refetch } = useGetCourseLectureQuery({ courseId });
    const createLectureHandler = async () => {
        // alert(lectureTitle);
        // alert(courseId)
        await createLecture({ lectureTitle, courseId })
    }
    console.log(lectureData)

    useEffect(() => {
        if (isSuccess) {
            refetch();
            // console.log('Hello')
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error]);

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl '>Lets add the Lectures </h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatem esse itaque voluptas consequatur quis libero nam voluptatum velit harum labore obcaecati beatae possimus placeat temporibus, dolorum sequi. Soluta, fuga!</p>
            </div>
            <div className='space-y-4 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" name="Course Title" value={lectureTitle} onChange={(e) => setlectureTitle(e.target.value)} placeholder="Your Title Name"></Input>

                </div>

                <div className='flex items-center gap-2'>
                    <Button onClick={() => navigate(`/admin/course/${courseId}`)} variant="outline">Back to Course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>{isLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</>) : "Create Lecture"}</Button>
                </div>
                <div className='mt-10'>
                    {
                        lectureLoading ? (<p>Loading lecture...</p>) : lectureError ? (<p>Failed to load lectures.</p>) : lectureData.lectures.length === 0 ? (<p>No Lecture Available</p>) : (lectureData.lectures.map((lecture, index) => (<Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}></Lecture>)))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateLecture