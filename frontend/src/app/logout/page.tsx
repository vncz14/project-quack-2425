'use client'
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { client_revalidate_path } from "../login/client_revalidate_path";
import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    client_revalidate_path('/login')
    redirect('/login')
  }, [])
  try {
    fetch(`http://localhost:8000/dj-rest-auth/logout/`, { 
      method: "POST", 
      body: JSON.stringify({ headers: `Token ${Cookies.get('csrftoken')}` })
    })
  } 
  catch(error) {
    console.error(error)
  }
  finally {
  }
  return (
    <>Logging you out.</>
  )
}