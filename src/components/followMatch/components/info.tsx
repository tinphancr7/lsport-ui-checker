import { Avatar } from "@nextui-org/react";

export interface Item {
    name: string,
    logo: string,
    score: number,
}

function Info({ item, reverse = false }: { item: Item, reverse: boolean }) {
    return (  
        <div className={`flex items-center justify-center gap-4 ${reverse ? "flex-row-reverse" : "flex-row"}`}>
            {/* Name */}
            <h3 className="text-base font-bold">{item.name}</h3>

            {/* Logo */}
            <Avatar
                src={item.logo}
                alt=""
                classNames={{
                    base: "w-10 h-10 bg-transparent",
                    img: "w-10 h-10 object-cover"
                }}
            />

            <h3 className="text-xl font-bold">{item.score}</h3>
            {/* Scope */}
        </div>
    );
}

export default Info;