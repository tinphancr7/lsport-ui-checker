import CardPromotion from "@/components/Card/CardPromotion";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Promotion() {
  return (
    <div>
      <div className="flex items-center justify-between bg-light py-4 px-10 rounded-xl">
        <Link href="/">
          <MdKeyboardArrowLeft size={24}/>
        </Link>
        <p>Khuyễn mãi</p>
        <Image src="/icons/vietnam.svg" alt="Viet nam" width={24} height={24} />
      </div>

      <div className="flex flex-wrap items-center mt-4 -mx-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <CardPromotion
            key={item}
            image=""
            dateEnd="22-07-2024"
            dateStart="22-06-2024"
            desc="THỂ  THAO ĐẢM BẢO TIỀN TIỀN CHO CƯỢC ĐẦU TIÊN 100%"
          />
        ))}
      </div>
    </div>
  );
}

export default Promotion;
