import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import RootLayout from "./layout";
import Cookies from "js-cookie";
import { NextRequest } from "next/server";
import { GetServerSideProps } from "next";
import { cookies } from 'next/headers'

export default async function Page(request: NextRequest) {

    const cookieStore = await cookies() // middleware should prevent entry if not logged in
    const user = JSON.parse(cookieStore.get('user')!.value)
    return (
        <>
            Hello {user.username}
        </>
    )
    
    
}