import Note from './note';

/**
 * Ticket interface for this ticketing.
 */
export default interface Ticket {
  /**
     * Required by Back4App database, contains the unique identifier of the ticket.
     */
  id: string;

  /**
     * Date when the ticket was registered.
     */
  data?: Date;

  /**
     * Activity made by ticket.
     */
  commessa: string;

  /**
     * Time spent on the activity.
     */
  ore: number;

  /**
    * Note associated to this ticket.
    */
  notes: Note[];
}
