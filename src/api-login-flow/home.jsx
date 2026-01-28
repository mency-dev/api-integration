import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import './Home.css'
import HomePage from "./pages/homePage";
export default function Home(){
    return(
        <>
        
            <Routes>
                {/* <Route path="/" element={<Login></Login>}></Route> */}
                <Route path="/" element={<HomePage></HomePage>}></Route>
            </Routes>
       
        </>
    );
}