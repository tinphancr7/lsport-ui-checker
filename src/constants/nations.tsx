import Image from "next/image";

const nations = [
    {
        key: "vi",
        icon: (
            <Image
                priority
                src="/icons/vietnam.svg"
                height={32}
                width={32}
                alt="Việt Nam"
            />
        ),
        label: "Việt Nam",
    },
    {
        key: "kh",
        icon: (
            <Image
                priority
                src="/icons/cambodia.svg"
                height={32}
                width={32}
                alt="Campuchia"
            />
        ),
        label: "Campuchia",
    },
    {
        key: "cn",
        icon: (
            <Image
                priority
                src="/icons/china.svg"
                height={32}
                width={32}
                alt="China"
            />
        ),
        label: "China",
    },
    {
        key: "sg",
        icon: (
            <Image
                priority
                src="/icons/singapore.svg"
                height={32}
                width={32}
                alt="Singapore"
            />
        ),
        label: "Singapore",
    },
    {
        key: "id",
        icon: (
            <Image
                priority
                src="/icons/indonesia.svg"
                height={32}
                width={32}
                alt="Indonesia"
            />
        ),
        label: "Indonesia",
    },
    {
        key: "my",
        icon: (
            <Image
                priority
                src="/icons/malaysia.svg"
                height={32}
                width={32}
                alt="Malaysia"
            />
        ),
        label: "Malaysia",
    },
];

export default nations;