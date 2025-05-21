import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/CourseApi';
import { Loader2 } from 'lucide-react';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function CourseTab() {
    const navigate = useNavigate();
    const params=useParams();
    const courseId=params.CourseId;
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    const [publishCourse,{}]=usePublishCourseMutation();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const {data:courseByIdData,isLoading:courseByIdLoading,refetch}=useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

    // const course=courseByIdData?.course
    useEffect(()=>{
       if(courseByIdData?.course)
       {
        const course=courseByIdData?.course;
        setInput({
        courseTitle:course.courseTitle,
        subTitle:course.subTitle,
        description:course.description,
        category:course.category,
        courseLevel:course.courseLevel ,
        coursePrice:course.coursePrice,
        courseThumbnail:"", 
        })
       }
    },[courseByIdData])

    const Selectcategory = (value) => {
        setInput({ ...input, category: value })
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const selectthumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    const changeEventHandler = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    }

    const updatecourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle)
        formData.append("subTitle", input.subTitle)
        formData.append("description", input.description)
        formData.append("category", input.category)
        formData.append("courseLevel", input.courseLevel)
        formData.append("coursePrice", input.coursePrice)
        formData.append("courseThumbnail", input.courseThumbnail)

        await editCourse({formData,courseId})
        console.log(input);
    }
    const publishStatusHandler=async (action)=>{
        try {
            const response=await publishCourse({courseId,query:action});
            if(response.data)
            {
                refetch();
                console.log(response)
                toast.success(response.data.message)
            }
        } catch (error) {
           toast.error("failed to publish or unpublish course")   
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course Updated")
        }
        if (error) {
            toast.error(error.data.message || "Failed to update course")
        }
    }, [isSuccess, error]);
    // const isLoading=false;
    if(courseByIdLoading)
    {
        return <h1>Loading ...</h1>
    }
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between ">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>Make changes to your course and click on save button.</CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button disabled={courseByIdData?.course.lectures.length===0} onClick={()=>publishStatusHandler(courseByIdData?.course.isPublished ? "false":"true")} variant="outline">
                        {
                            courseByIdData?.course.isPublished ? "Unpublished" : "Publish"
                        }
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <label>Title</label>
                        <Input type="text" value={input.courseTitle} onChange={changeEventHandler} name="courseTitle" placeholder="Ex. Full stack"></Input>
                    </div>
                    <div>
                        <label>SubTitle</label>
                        <Input type="text" value={input.subTitle} onChange={changeEventHandler} name="subTitle" placeholder="Ex. Become fullstack developer"></Input>
                    </div>
                    <div className='flex flex-columns'>
                        <label>Description</label>
                        <textarea name='description' value={input.description} onChange={changeEventHandler}></textarea>
                        <RichTextEditor></RichTextEditor>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <label>Category</label>
                            <Select onValueChange={Selectcategory}>
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
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="Mongodb">Mongodb</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label>Course Level</label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label>Price in (INR)</label>
                            <Input className="w-fit" type="number" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="199"></Input>
                        </div>
                    </div>
                    <div>
                        <label>Course Thumbnail</label>
                        <Input onChange={selectthumbnail} type="file" accept="image/*" className="w-fit"></Input>
                        {
                            previewThumbnail && (<img src={previewThumbnail} className="w-64 my-2" alt='CourseThumbnail'></img>)
                        }
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
                        <Button disabled={isLoading} onClick={updatecourseHandler}>{isLoading ? (<> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</>) : "Save"}</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab