'use client'
import Signup from "@/components/signup";
import { useState } from "react";
import { redirect } from 'next/navigation'
import Cookies from "js-cookie";
import { client_revalidate_path } from "../login/client_revalidate_path";

const register = async (formData, setErrors) => {
  const res = await fetch('http://localhost:8000/dj-rest-auth/registration/', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await res.json()
  if (!res.ok) {
    console.log(Object.values(data))
    setErrors(Object.values(data).flat()) // Object.values() gets the values of a dictionary -> list
  }
  else {
    Cookies.set('csrftoken', data.key, { 
      expires: 7,
      sameSite: 'strict',
      secure: true,
      httpOnly: process.env.IS_PRODUCTION == 'true'
  
    })
    Cookies.set('user', JSON.stringify(data.user))
    client_revalidate_path('/')
    redirect('/')
  }
}
export default function page() {
  const [errors, setErrors] = useState([])
  const onSubmit = (event) => {
    event?.preventDefault();
    const formData = {
      username: event.target.username.value,
      email: event.target.email.value,
      password1: event.target.password1.value,
      password2: event.target.password2.value
    }
    register(formData, setErrors)
  }
  return (
    <>
      <Signup onSubmit={onSubmit} errors={errors}/>
    </>
  )
}
