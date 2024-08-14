import { Avatar, Button } from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { TbBallpen } from "react-icons/tb";

const FollowMePage = () => {
  return (
    <div className="flex flex-wrap -mx-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
        <div
          className="basis-1/2 px-4 mb-8"
          key={index}
        >
          <div className="flex items-center justify-between border-2 border-slate-200 rounded-lg p-4">
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-20 h-20 text-large"
            />
            <div>
              <p className="text-primary text-lg font-bold">Cộng đồng OKCHOI</p>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-1">
                  <TbBallpen size={20} className="text-gray"/>
                  <p className="text-gray">1.4K</p>
                </div>
                <div className="flex items-center gap-x-1">
                  <AiOutlineLike size={20} className="text-gray"/>
                  <p className="text-gray">1.4K</p>
                </div>
                <div className="flex items-center gap-x-1">
                  <PiUserCirclePlusLight size={20} className="text-gray"/>
                  <p className="text-gray">1.4K</p>
                </div>
              </div>
            </div>
            <Button
              variant="bordered"
              className="border-primary text-primary !font-medium"
            >
              Đã theo dõi
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowMePage;
