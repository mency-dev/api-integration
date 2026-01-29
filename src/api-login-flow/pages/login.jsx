import { useForm } from "react-hook-form";
import { apiFetch } from "../api/api";
import {  useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, getValues,reset } = useForm();
  const [otpField, setOtpField] = useState(false);
  const [otpSent,setOtpSent] = useState(false);
  const navigate =useNavigate();
  function onSubmit(data) {
    const {phoneNumber,otp} =data;
    apiFetch("auth/otp/verify",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            phone_number:phoneNumber,
            otp_type:"login",
            otp:otp,
        })
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        if(data.message==="Suceesfully Verified"){
            localStorage.setItem("token",data.token)
            alert("login Successful")
            navigate("/home/homePage")
            reset({phoneNumber:"",
                otp:""
            })
            setOtpField(false);
            setOtpSent(false)
        }else {
      alert("Invalid OTP");
    }
    })

  }
  function getOtp() {
    const phone = getValues("phoneNumber");

    apiFetch("auth/otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        otp_type: "login",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOtpField(true);
        setOtpSent(true);
      });
  }
  return (
    <>
      <div className="py-10 flex mx-70 shadow-xl/30 w-1/2 h-100 my-20">
        <div className="relative ">
          <h1 className="text-[19px] ml-60">Sign in to your account</h1>
          <div className="absolute bg-gray-200 my-10 py-10 px-10 ml-40 text-justify ">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <p>Phone Number</p>
              <div className="relative">
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="border border-gray-300 pl-3 pr-18 py-3 mb-3"
                />
                <div className="absolute top-3 right-2">
                  <button type="button" onClick={getOtp}>Get OTP</button>
                </div>
              </div>
              {otpField && (
                <input
                  type="text"
                  {...register("otp")}
                  placeholder="Enter OTP"
                  className="border mt-3 mb-5"
                />
              )}
              <button className="w-full py-3 bg-gray-500" type="submit" disabled={!otpSent}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
