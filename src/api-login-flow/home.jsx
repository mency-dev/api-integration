import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import './Home.css'
export default function Home(){
    return(
        <>
        
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
            </Routes>
       
        </>
    );
}