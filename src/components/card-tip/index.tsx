import Image, { StaticImageData } from "next/image";
import { CiCalendar, CiClock2 } from "react-icons/ci";

interface CardTipsProps {
    tip: {
        leagueLogo: StaticImageData,
        season: string| number,
        homeName: string,
        awayName: string,
        leagueName: string,
        date: string,
        time: string,
    },
    className?: string;
}
 
function CardTip({ tip, className = "" }: CardTipsProps) {

    return (  
        <div className={`grid grid-cols-12 items-center gap-x-4 ${className}`}>
            <div className="col-span-2">
                <Image
                    src={tip.leagueLogo}
                    alt="loi-anh"
                    width={40}
                    height={40}
                />
            </div>
            <div className="col-span-10">
                <div className="flex gap-3 max-sm:flex-col max-sm:gap-0 max-sm:items-center">
                    <span>{tip.homeName}</span>
                    <span>vs</span>
                    <span>{tip.awayName}</span>
                </div>
                <p className="text-[#101828] font-light">{tip.leagueName}</p>
                <div className="text-[#475467] flex items-center gap-x-2 font-light">
                    <CiCalendar />
                    <p className="">{tip.date}</p>
                    <p className="flex items-center gap-x-1">
                        <CiClock2 />
                        <span>{tip.time}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardTip;