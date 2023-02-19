 import {Routes,Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { Cars } from "./pages/Cars"
 
import { Signup } from "./pages/Signup"
import { MyCars } from "./pages/MyCars"
import { CarDetails } from "./pages/CarDetails"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./pages/ProtectedRoute"
function App() {
  

  return (
  <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<ProtectedRoute><Cars/></ProtectedRoute> }/>
        {/* <Route path="/cars" element={<ProtectedRoute><Cars/></ProtectedRoute> }/> */}
        <Route path="/cars/:id" element={<ProtectedRoute><CarDetails/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/my_cars" element={<ProtectedRoute><MyCars/></ProtectedRoute>}/>
    </Routes>
   </>
  )
}

export default App
