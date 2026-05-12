import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"  //write .jsx
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <>
    <Toaster/>
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
    </>
  )
}

export default App
