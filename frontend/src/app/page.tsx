import { cookies } from 'next/headers'
import { useEffect } from "react";
import { Text } from "@/components/ui/text";

export default async function Page(request: NextRequest) {
    const cookieStore = await cookies() // middleware should prevent entry if not logged in
    console.log(            cookieStore.get("csrftoken")!.value
)
    const res = await fetch('http://localhost:8000/homepage/', {
        headers: {
            Authorization: `Token ${cookieStore.get("csrftoken")!.value}`,
            "Content-Type": "application/json",
          },
    });
    const data = await res.json();
    const user = JSON.parse(cookieStore.get('user')!.value)
    console.log(data)
    return (
        <>
            Hello {user.username}
            <br/>
            <Text as="h1">Hosting</Text>
            {data.events_organized.length ? <div>{data.events_organized}</div> : <div> You're not hosting anything </div>}
            <Text as="h1">RVSP'd</Text>
            {data.my_events.length ? <div>{data.my_events}</div> : <div> No events yet ! </div>}


            <br/>
        </>
    )
    
    
}