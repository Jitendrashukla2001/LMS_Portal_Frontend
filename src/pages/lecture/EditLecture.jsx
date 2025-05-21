import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab';

function EditLecture() {
    const params = useParams();
    const courseId = params.CourseId;
    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-2'>
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <ArrowLeft size={16}></ArrowLeft>
                        </Button>
                    </Link>
                    <h1 className='font-bold text-xl'>Update your Lecture</h1>
                </div>
            </div>
            <LectureTab></LectureTab>
        </div>
    )
}

export default EditLecture