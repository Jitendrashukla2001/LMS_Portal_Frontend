import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from "@/DarkMode";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Menu, School } from 'lucide-react'
import React from 'react'
import { Button } from './button';
import { DropdownMenuShortcut } from './dropdown-menu';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authapi";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function Navbar() {
    // const user = true;
    const {user}=useSelector(store=>store.auth)
    console.log(user)
    const navigate=useNavigate();
    const [logoutUser,{data,isSuccess}]=useLogoutUserMutation();

    const logoutHandler=async ()=>{
        await logoutUser();
    }
    useEffect(() => {
        if(isSuccess)
        {
            toast.success(data.message || "Logout successfully")
            navigate("/login");
        } 
    }, [isSuccess]);
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={'30'}></School>
                   <Link to="/"><h1 className='hidden md:block font-extrabold text-2xl'>E-learning </h1></Link> 
                </div>
                <div>
                    {/* User icon and dark mode */}

                    <div className="flex items-center gap-8">
                        {user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={user?.photoURL ||"https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel className='font-bold'>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem><Link to="my-learning">My Learning</Link>

                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="profile">Edit Profile</Link>
                                        
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Setting
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler}>
                                        Logout
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>navigate("admin")}>
                                        {user.role ==="student"?<></>:<>Dashboard</>}
                                        
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={()=>navigate("/login")}>Login</Button>
                                <Button onClick={()=>navigate("/login")}>Signup</Button>
                            </div>

                        )

                        }
                        <DarkMode></DarkMode>
                    </div>
                </div>
            </div>
            {/* Mobile device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">E-learning</h1>
                <MobileNavbar user={user}></MobileNavbar>
            </div>
        </div>
    )
}

export default Navbar;

const MobileNavbar = ({user}) => {
    // const role = "instructor";
    // console.log(user)
    const navigate=useNavigate();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline"><Menu></Menu></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row justify-between mt-2">
                    <SheetTitle><Link to="/">E-Learning</Link></SheetTitle>
                    <DarkMode></DarkMode>
                </SheetHeader>
                <Separator className="mr-2"></Separator>
                <nav className="flex flex-col space-y-4">
                    <span><Link to="/my-learning">My Learning</Link></span>
                    <span><Link to="/profile">Edit Profile</Link></span>
                    <span>Logout</span>

                </nav>
                {
                    user?.role === "instructor" && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit" onClick={()=>navigate("/admin/dashboard")}>Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }

            </SheetContent>
        </Sheet>
    )
}