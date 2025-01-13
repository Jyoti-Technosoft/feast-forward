export const RoleData = [
    {
        id: 1,
        value: "volunteer",
        name: "volunteer",
    },
    {
        id: 2,
        value: "join new user",
        name: "join new user",
    },
    {
        id: 3,
        value: "admin",
        name: "admin",
    },
];

export const getInitials = (userName) => {
    if (!userName) return "";
    const words = userName?.trim()?.split(" ");
    if (words?.length === 1) {
        return words[0][0]?.toUpperCase();
    } else {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
};

export const GetInitialsName = ({ name, className }) => {
    return (
            <div className={`${className} profile-names`}>
                {getInitials(name)}
            </div>
    );
};
