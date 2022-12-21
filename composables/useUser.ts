import Parse from 'parse';
import type { Ref, } from 'vue';

/**
 * Use this state store to manage the current user of the application.
 *
 * @returns useState function for current user value.
 */
export default function (): Ref<Parse.User | null> {
  return useState<Parse.User | null>(
    'user',
    () => Parse.User.current() ?? null,
  );
}

/**
 * Use this function to get the current Parse user.
 *
 * @returns Promises to the current Parse user.
 */
export async function getCurrentUser (): Promise<Parse.User | null> {
  const currentUser: Parse.User | null = await Parse.User.currentAsync();
  const username: string = currentUser?.get('username');
  console.log(`Current user required is ${username}`);
  const user = useUser();
  user.value = currentUser;
  return user.value;
}
