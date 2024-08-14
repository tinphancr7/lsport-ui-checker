import { Avatar, Image } from "@nextui-org/react";
import { IoFootballSharp } from "react-icons/io5";
import { Progress } from "@nextui-org/react";
import { GiGolfFlag } from "react-icons/gi";

function CurrnetScope() {
    return (  
        <div className="relative flex items-center justify-center">
            <Image 
                src="/imgs/match-info.png" 
                alt=""
                removeWrapper
                className="w-full h-auto max-h-[120px] object-cover"
            />

            <div className="absolute z-10 top-0 left-0 bottom-0 right-0 bg-slate-900/70 rounded-lg">
                <div className="h-full grid grid-cols-3 justify-between items-center pb-2">
                    <div className="col-span-1 flex justify-center items-center gap-5">
                        <p className="text-light text-2xl font-bold">Chelsea</p>
                        {/* Logo */}
                        <Avatar
                            isBordered
                            src={"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"}
                            alt=""
                            classNames={{
                                base: "w-14 h-14 bg-transparent",
                                img: "w-14 h-14"
                            }}
                        />
                    </div>
                    <div className="col-span-1 text-light">
                        <div className="font-bold text-2xl flex justify-center items-center gap-8 mb-3">
                            <span>4</span>
                            <span>:</span>
                            <span>1</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-2">
                                <IoFootballSharp />
                                <span>1 - 0</span>
                            </p>
                            <p>58 : 33</p>
                            <p className="flex items-center gap-2">
                                <GiGolfFlag />
                                <span>2 - 2</span>
                            </p>
                        </div>
                        
                        <Progress
                            label="Monthly expenses"
                            size="sm"
                            value={5833}
                            maxValue={9000}
                            color="warning"
                            showValueLabel={true}
                            classNames={{
                                labelWrapper: "hidden"
                            }}
                        />

                        <p className="text-center mt-1">Hiệp 2</p>
                    </div>
                    <div className="col-span-1 flex justify-center items-center gap-5">
                        <Avatar
                            isBordered
                            src={"https://upload.wikimedia.org/wikipedia/vi/a/a1/Man_Utd_FC_.svg"}
                            alt=""
                            classNames={{
                                base: "w-14 h-14 bg-transparent",
                                img: "w-14 h-14"
                            }}
                        />
                        <p className="text-light text-2xl font-bold">Manu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrnetScope;