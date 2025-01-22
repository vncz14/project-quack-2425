'use client'
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"
import { useState } from "react"
import { setConfig } from "next/config"
import Cookies from "js-cookie"
import { client_revalidate_path } from "./client_revalidate_path"
import { revalidatePath } from "next/cache"

const password_login = async (formData, setError) => {
  const res = await fetch('http://localhost:8000/dj-rest-auth/login/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",

    },  
    body: JSON.stringify(formData),
  })
  const data = await res.json()
  if (!res.ok) {
    setError(Object.values(data).flat())
    return
  }
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
const handleSubmit = (event, setError) => {
  event.preventDefault();
  const form_data = {
    username: event.target.username.value,
    password: event.target.password.value
  }
  password_login(form_data, setError)
  
}
export default function LoginPage() {
  if (Cookies.get('csrftoken') !== undefined) {
    redirect('/')
  }
  const [errors, setErrors] = useState('')
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Wolfie's Social
        </a>
        <LoginForm errors={errors} onSubmit={event => handleSubmit(event, setErrors)} />
      </div>
    </div>
  )
}
