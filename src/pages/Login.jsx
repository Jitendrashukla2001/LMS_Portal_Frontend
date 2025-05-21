import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authapi"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router"


const  Login=()=> {
  const [signupInput,setsignInput]=useState({name:"",email:"",password:""});
  const [loginInput,setloginInput]=useState({email:"",password:""});

  const [registerUser,{data:registerData,error:registerError,isLoading:registerIsLoading,isSuccess:registerIsSuccess}]=useRegisterUserMutation();
  const [loginUser,{data:loginData,error:loginError,isLoading:loginIsLoading,isSuccess:loginIsSuccess}]=useLoginUserMutation();
  const navigate=useNavigate();
  const changeInputHandler=(e,type)=>{
     const {name,value}=e.target;
      if(type==="signup")
      {
        setsignInput({...signupInput,[name]:value})
      }
      else{
        setloginInput({...loginInput,[name]:value})
      }
  }

  const handleRegistration=async (type)=>{
    const Inputdata=type==="signup" ? signupInput : loginInput;
    const action=type==="signup" ? registerUser : loginUser;
     await action(Inputdata)
    //  console.log(loginInput)

  }

  useEffect(() => {
    if(registerIsSuccess && registerData)
    {
      toast.success(registerData.message || "Sign up successfully")
    }
    if(registerError)
    {
      toast.error(registerError.data.message || "Sign up failed")
    }
    if(loginIsSuccess && loginData)
    {
      toast.success(loginData.message || "Login successfully")
      navigate("/")
    }
    if(loginError)
    {
      toast.error(loginError.data.message || "login failed")
    }
  }, [loginIsLoading,registerIsLoading,loginData,registerData,loginError,registerError]);

  return (
<div className="flex items-center w-full justify-center mt-20">
<Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">SignUp</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account and click on signup where you're done
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" value={signupInput.name} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. Jitendra" required="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input type="email" name="email" value={signupInput.email} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. Email" required="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input type="password" name="password" value={signupInput.password} onChange={(e)=>changeInputHandler(e,"signup")} placeholder="Eg. xyz" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={registerIsLoading} onClick={()=>handleRegistration("signup")}>{
              registerIsLoading ? (<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin">Please wait</Loader2>
              </>):"Signup"
            }</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
           Login only when you signed up you'll be logged in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <Label htmlFor="current">Email</Label>
              <Input type="email" name="email" value={loginInput.email} onChange={(e)=>changeInputHandler(e,"login")} placeholder="Eg. Email" required="true"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input type="password" name="password" value={loginInput.password} onChange={(e)=>changeInputHandler(e,"login")} placeholder="Eg. xyz" required="true"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loginIsLoading} onClick={()=>handleRegistration("loginup")}>{
     loginIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin">Please Wait</Loader2></>):"Login"
}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
</div>
  )
}
export default Login