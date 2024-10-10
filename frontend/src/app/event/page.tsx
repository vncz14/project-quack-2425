import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

const EventListPage = () => {
    return (
        <div>
            <Text as="h2">Event list</Text>
            <Button asChild>
                <Link href="/event/1">/event/1</Link>
            </Button>
        </div>
    );
};

export default EventListPage;
