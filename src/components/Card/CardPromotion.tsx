import Image from "next/image";
import Link from "next/link";

interface Props {
  key?: number;
  image: string;
  desc: string;
  dateStart: string
  dateEnd: string
}
const CardPromotion = ({ key, image, desc, dateStart, dateEnd }: Props) => {
  return (
    <Link href='/' className="basis-1/3 p-4" key={key}>
      <div className="rounded-xl overflow-hidden bg-light">
        <div className="w-full h-[195px]">
          <Image
            alt="Card background"
            className="object-cover w-full h-full"
            src={image || "https://nextui.org/images/hero-card-complete.jpeg"}
            width={400}
            height={400}
          />
        </div>
        <div className="p-3 flex items-center justify-between">
          <div>
            <p className="line-clamp-1 text-lg">
              {desc}
            </p>
            <p className="text-gray text-sm mt-1">
              {dateStart} đến {dateEnd}
            </p>
          </div>
          <div>
            <Image
              src="/icons/vietnam.svg"
              alt="Viet nam"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPromotion;
