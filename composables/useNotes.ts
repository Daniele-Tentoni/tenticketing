import Note from '../models/note';

export default function (): Ref<Note[]> {
  return useState<Note[]>(
    'notes',
    () => [] as Note[],
  );
}
