import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import RootLayout from "./layout";

import { getCookie } from "@/helper";

const homepage = async () => {
    const token = getCookie('token')
    const res = await fetch('http://localhost:8000/homepage/')
}
export default function Home() {
    return (
        <div>
            <Text as="h2">Your profile</Text>
            
            Hello
            {/* <Button asChild>
                <Link href="/event">
                    <Text as="h4">shadcn button component (event list)</Text>
                </Link>
            </Button> */}
        </div>
    );
}
