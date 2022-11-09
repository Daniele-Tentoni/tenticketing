import Ticket from '../models/ticket';

export default function (): Ref<Ticket[]> {
    return useState<Ticket[]>(
        'tickets',
        () => [] as Ticket[],
    );
};
