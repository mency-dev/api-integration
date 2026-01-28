import { useEffect } from "react"
import { apiFetch } from "../api/api"

export default function HomePage(){
    useEffect(()=>{
        const token = localStorage.getItem("token");
  if (!token) return;
        apiFetch("auth/user",{
            header:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
    })
    return(
        <>
        <h1>Home page</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur numquam natus magnam pariatur magni a itaque nesciunt nihil,institutes/filter?institute_type_id=56 institute-reviews?id=95 institutes/52/reviews rating description name voluptatum ullam tenetur et est ratione, recusandae, harum fugit ea fuga ipsam.</p>
        </>
    )
}