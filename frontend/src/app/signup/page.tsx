'use client'
import Signup from "@/components/signup";
import { useState } from "react";
import { redirect } from 'next/navigation'

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
    console.log(data)
    const expiresDate = new Date()
    expiresDate.setTime(expiresDate.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7 days from now
    document.cookie = `token=${data.key}; expires=${expiresDate.toUTCString()}; SameSite=Strict; Secure; HttpOnly`
    redirect('/login')
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
