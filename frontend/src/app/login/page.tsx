'use client'
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { getCookie } from "@/helper"
import { redirect } from "next/navigation"
import { useState } from "react"
import { hasCookie } from "cookies-next/client"

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
    console.log(data)
    setError(Object.values(data).flat())
    return
  }
  const expiresDate = new Date()
  expiresDate.setTime(expiresDate.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7 days from now
  document.cookie = `csrftoken=${data.key}; expires=${expiresDate.toUTCString()}; SameSite=Strict; Secure; HttpOnly`

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
  if (hasCookie('csrftoken')) {
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
