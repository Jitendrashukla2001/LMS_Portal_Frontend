import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import React,{useState,useEffect} from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/CourseApi'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

function LectureTab() {
    const [lectureTitle,setLectureTitle]=useState("");
    const [uploadVideoInfo,setUploadVideoInfo]=useState(null);
    const [isFree,setIsFree]=useState(false);
    const [mediaProgress,setMediaProgress]=useState(false);
    const [uploadProgess,setUploadProgress]=useState(0);
    const [btnDisable,setBtnDisable]=useState(true);
    const params=useParams();
    const courseId=params.CourseId;
    const lectureId=params.LectureId;
    const {data:lectureData,refetch}=useGetLectureByIdQuery(lectureId);
    const lecture=lectureData?.lecture;
    // console.log(lecture)

    useEffect(()=>{
          if(lecture)
          {
            setLectureTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
            setUploadVideoInfo(lecture.videoInfo);
          }
    },[lecture])

    // const {courseId,lectureId}=params;
    const MEDIA_API="http://localhost:9001/api/v1/media"
    const [editLecture,{data,isLoading,isSuccess,error}]=useEditLectureMutation();
    const [removeLecture,{data:removeData,isLoading:removeLoading,isSuccess:removeSuccess}]=useRemoveLectureMutation();

   
    const fileChangeHandler=async (e)=>{
        const file=e.target.files[0];
        if(file)
        {
            const formData=new FormData();
            formData.append("file",file);
            setMediaProgress(true);
            try {
                const res=await axios.post(`${MEDIA_API}/upload-video`,formData,{onUploadProgress:({loaded,total})=>{
                    setUploadProgress(Math.round(loaded*100)/total)
                }})
                if(res.data.success)
                {
                    console.log(res)
                    setUploadVideoInfo({videoUrl:res.data.data.url,publicId:res.data.data.public_id})
                    setBtnDisable(false)
                    toast.success(res.data.message)
                }
            } catch (error) {
               console.log(error);
               toast.error("video upload failed") 
            }
            finally{
                setMediaProgress(false)
            }
        }
    }
    const editLectureHandler=async ()=>{
        await editLecture({lectureTitle,videoInfo:uploadVideoInfo,isPreviewFree:isFree,courseId,lectureId})
   }
   useEffect(()=>{
     if(isSuccess)
     {
        refetch();
        // console.log(data)
        toast.success(data.message)
     }
     if(error)
     {
        toast.error(error.data.message)
     }
   },[isSuccess,error])
   
   const removeLectureHandler=async ()=>{
      await removeLecture(lectureId)
   }

   useEffect(()=>{
      if(removeSuccess)
      {
        toast.success(removeData.message)
      }
   },[removeSuccess])
    return (
        <Card>
            <CardHeader >
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes in click on save after edit</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>{removeLoading ?<>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2></>:"Remove Lecture"}</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input type="text" value={lectureTitle} placeholder="Ex. Introduction to Javascript" onChange={(e)=>setLectureTitle(e.target.value)}></Input>
                </div>
                <div className='my-5'>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input className="w-fit" type="file" accept="video/*"  onChange={fileChangeHandler} placeholder="Ex. Introduction to Javascript"></Input>
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is This video FREE</Label>
                {
                    mediaProgress && (
                        <div className='my-4'>
                         <Progress value={uploadProgess}></Progress>
                         <p>{uploadProgess}% uploaded</p>
                        </div>
                    )
                }
                </div>
                <div className='mt-4'>
                    <Button disabled={isLoading} onClick={editLectureHandler}>{isLoading ?<>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2></>:"Update lecture"}</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab