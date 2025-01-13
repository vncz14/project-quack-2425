'use client'
import { useState, useRef } from "react"
import { Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useSWR from "swr" // https://swr.vercel.app/
import ErrorMessage from "../ErrorMessage"
import { redirect } from "next/navigation"

const fetcher = async (url: URL) => {
  
  const res = await fetch(url, {
    mode: 'cors'
  })
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    if (res.status === 404) {
      error.message = 'No user exists with that email.'
    }
    error.status = res.status
    throw error
  }
  return await res.json()
}

export default function ask_for_user_page() {
  const [email, setEmail] = useState('')
  const email_input_ref = useRef(null)
  const clean_email = email.toLowerCase().trim()

  const fetcher_ignore_page_onload = email.length > 0 ? fetcher : () => {} // useSWR is a custom react hook so it must be run but its first run is always an error 404 so we want to avoid fetching on page load.
  const { data, error, isLoading } = useSWR(`http://localhost:8000/user/email/${clean_email}`, fetcher_ignore_page_onload, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
    }
  })
  if (email.length > 0) {
    if (isLoading) return <div>loading...</div>
    setTimeout(() => {
      redirect(`/profile/${data.id}`)
    }, 1500);
    if (!error) return (
      <div>
        <h1>You will be redirected shortly!</h1>
        <p>We found {data.first_name} {data.last_name}!</p>
      </div>
    )
  }
  return (
    <div className="flex-col w-full max-w-sm">
      {email.length > 0 && error ? 
        <div>
          <ErrorMessage error={error}/> 
          <p>You entered: {email}. <a>Invite them?</a> </p>
          
        </div>
      : ''}
      <h1>See if your friends are already here! </h1>
      <div className="flex gap-2">
        <Input 
          type="email" 
          placeholder="Email"
          ref={email_input_ref}  
        />
        <Button type="submit" onClick={() => {setEmail(email_input_ref.current.value)}}>search</Button>
      </div>
    </div>
  )
}