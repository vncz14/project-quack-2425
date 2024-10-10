import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Text as="h2">Shadcn text component (Homepage)</Text>
            <Button asChild>
                <Link href="/event">shadcn button component (event list)</Link>
            </Button>
        </div>
    );
}
