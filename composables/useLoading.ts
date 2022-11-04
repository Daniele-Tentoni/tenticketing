export default function () {
    return useState<boolean>("loading", () => false);
};
