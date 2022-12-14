/**
 * Note for a ticket. Use this to store anything about your ticket.
 */
export default interface Note {
  /**
     * Unique identifier of the note.
     * Required by Back4App.
     */
  // id: number;

  /**
     * What this is note about.
     */
  subject: string;

  /**
     * Value of this note. Could be string, number or any type.
     */
  value: any;
}
