import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

const ExampleEventList = async () => {
    const res = await fetch(`${process.env.API_URL}/event`, {
        next: { revalidate: 10 },
    });
    const events = await res.json();
    return events.map(
        (event: { id: number; name: string } /*TODO: CHANGE*/) => (
            <Button asChild key={event.id}>
                <Link href={`/event/${event.id}`}>
                    <Text as="h4">{event.name}</Text>
                </Link>
            </Button>
        )
    );
};
export default ExampleEventList;
