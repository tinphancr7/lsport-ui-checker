import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const hotLink = [
  "Juventus",
  "Liverpool",
  "Inter Milan",
  "Manchester City",
  "Paris Saint-Germain",
	'Atletico Madrid',
	'Manchester United',
	'Bayern Munich',
	'Real Madrid',
	'Borussia Dortmund'
];

function Search() {
  return (
    <div className="bg-light p-4 shadow-container rounded-lg">
      <div className="w-4/5 py-2 flex items-center gap-x-3 relative">
        <div className="flex w-full items-center gap-x-2 bg-grayF5 rounded-full px-5">
          <button>
            <IoSearchOutline size={20} />
          </button>
          <input
            placeholder="Tìm đội / giải đấu"
            className="outline-none h-10 w-full bg-transparent"
          />
        </div>
        <div className="cursor-pointer absolute -translate-x-1/2 right-0">
          <IoIosCloseCircle size={40} className="text-gray9E" />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold">Tìm kiếm Hot</p>
        <div className="flex flex-wrap mt-4">
          {hotLink.map((item, index)=> (
            <div key={index} className="basis-1/2 my-2">
              <Link href='/' className="text-xl">{item}</Link>
            </div>	
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
