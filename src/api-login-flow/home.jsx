import { Outlet, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import './Home.css'
import HomePage from "./pages/homePage";
export default function Home(){
    return(
        <>
        
            <Outlet></Outlet>
       
        </>
    );
}