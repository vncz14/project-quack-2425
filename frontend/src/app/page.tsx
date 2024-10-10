import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Text as="h2">Shadcn text component (Homepage)</Text>
            <Button asChild>
                <Link href="/event">
                    <Text as="h4">shadcn button component (event list)</Text>
                </Link>
            </Button>
        </div>
    );
}
