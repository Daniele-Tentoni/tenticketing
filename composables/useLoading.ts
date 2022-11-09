/**
 * Use this state store to manage the loading state of the application.
 *
 * @returns useState function for loading value.
 */
export default function (): Ref<boolean> {
    return useState<boolean>(
        'loading',
        () => false,
    );
};
