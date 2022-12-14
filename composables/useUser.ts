/**
 * Use this state store to manage the current user of the application.
 *
 * @returns useState function for current user value.
 */
export default function (): Ref<string> {
  return useState<string>(
    'user',
    () => '',
  );
}
