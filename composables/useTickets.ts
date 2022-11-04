import Ticket from "../models/ticket";

export default function () {
    return useState<Ticket[]>("tickets", () => <Ticket[]>[]);
};