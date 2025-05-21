import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState,useEffect} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/CourseApi'
import { toast } from 'sonner'

function AddCourses() {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const [createCourse,{data,isLoading,error,isSuccess}]=useCreateCourseMutation();
    const navigate = useNavigate();
    const createCourseHandler = async () => {
        console.log(courseTitle, category)
        await createCourse({courseTitle,category})
    }
    const getSelectedCategory = (value) => {
        // alert(value);
        setCategory(value);
    }
    //for display toast
    useEffect(() => {
      if(isSuccess)
      {
        toast.success(data?.message || "Course Created")
        navigate("/admin/course")
      }
    }, [isSuccess,error]);
    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl '>Lets add the courses basic details</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatem esse itaque voluptas consequatur quis libero nam voluptatum velit harum labore obcaecati beatae possimus placeat temporibus, dolorum sequi. Soluta, fuga!</p>
            </div>
            <div className='space-y-4 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" name="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Your Course Name"></Input>

                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                <SelectItem value="MERN stack Development">MERN stack Development</SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Backend">Backend</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="Mongodb">Mongodb</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => navigate("/admin/course")} variant="outline">Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>{isLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</>) : "Create"}</Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourses