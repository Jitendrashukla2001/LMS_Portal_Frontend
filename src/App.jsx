import React from 'react'
import { Button } from './components/ui/button'
import "./App.css"
import Login from './pages/Login'
import Navbar from './components/ui/navbar'
import Herosection from './pages/student/Herosection'
import { Link } from 'react-router-dom'
import Mainlayout from './Layout/Mainlayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Courses from './pages/student/Courses'
import { CreativeCommons, LogIn } from 'lucide-react'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import SideBar from './pages/admin/sidebar'
import Dashboard from './pages/admin/Dashboard'
import Course from './pages/student/Course'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourses from './pages/admin/course/addcourses'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/lecture/createLecture'
import EditLecture from './pages/lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ui/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/ui/PurchasedCourseRoute'
import { ThemeProvider } from './components/ui/ThemeProvider'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout></Mainlayout>,
    children:[
      {
        path:"/",
        element:<>
        <Herosection></Herosection>
        <Courses></Courses>
        </>
      },
      {
        path:"course-progress/:courseId",
        element:(<ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress></CourseProgress></PurchaseCourseProtectedRoute></ProtectedRoute>)
      },
      {
       path:"login",
       element:(<AuthenticatedUser><Login></Login></AuthenticatedUser>)
      },
      {
        path:"my-learning",
        element:(<ProtectedRoute><MyLearning></MyLearning></ProtectedRoute>)
      },
      {
        path:"profile",
        element:(<ProtectedRoute><Profile></Profile></ProtectedRoute>)  
      },
      {
        path:"course/search",
        element:(<ProtectedRoute><SearchPage></SearchPage></ProtectedRoute>)
      },
      {
        path:"course-details/:courseId",
        element:(<ProtectedRoute><CourseDetails></CourseDetails></ProtectedRoute>)
      },
      {
        path:"admin",
        element:(<AdminRoute><SideBar></SideBar></AdminRoute>),
        children:[
          {
            path:"dashboard",
            element:<Dashboard></Dashboard>
          },
          {
            path:"course",
            element:<CourseTable></CourseTable>
          },
          {
            path:"course/create",
            element:<AddCourses></AddCourses>
          },
          {
            path:"course/:CourseId",
            element:<EditCourse></EditCourse>
          },
          {
            path:"course/:CourseId/lecture",
            element:<CreateLecture></CreateLecture>
          },
          {
            path:"course/:CourseId/lecture/:LectureId",
            element:<EditLecture></EditLecture>
          }
        ]
      }
    ]
  }
])
function App() {
  return (
    <main>
      <ThemeProvider>
    <RouterProvider router={appRouter}></RouterProvider>
    </ThemeProvider>
    </main>
 
  )
}

export default App