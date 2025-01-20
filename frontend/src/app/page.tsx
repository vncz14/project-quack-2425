import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import RootLayout from "./layout";

import { getCookie } from "@/helper";

const homepage = async () => {
    const token = getCookie('csrftoken')
    const res = await fetch('http://localhost:8000/homepage/')
}
export default function Home() {
    
    return <a href="/api/auth/signin">Sign in</a>

}
