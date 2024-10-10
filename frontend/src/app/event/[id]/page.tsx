import { Text } from "@/components/ui/text";

const EventDetailPage = ({ params }: { params: { id: string } }) => {
    return <Text as="h2">Event details: {params.id}</Text>;
};

export default EventDetailPage;
