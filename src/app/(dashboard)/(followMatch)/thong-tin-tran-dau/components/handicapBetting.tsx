import { AiOutlineClose } from "react-icons/ai";

function HandicapBetting({ title, data, openScope = false }: { title: string, data: any, openScope?: boolean }) {
    return (  
        <div className="p-4 rounded-xl bg-light">
            <div className="flex gap-4 text-sm">
                <p className="text-dark font-medium">
                    {title}
                </p>
                {openScope && (
                    <p className="text-primary font-medium">
                        Tỷ Số Phạt Góc Hiện Tại {data?.homeTeam?.scope} - {data?.awayTeam?.scope}
                    </p>
                )}
            </div>

            {data?.title && (
                <p className="text-dark text-sm font-medium my-3">
                    {data?.title}
                </p>
            )}
            {/* Header */}
            {data?.homeTeam?.name && data?.awayTeam?.name && (
                <div className="mt-5 mb-2 flex items-center justify-between px-[5%] font-medium text-sm">
                    <p className="text-dark">{data?.homeTeam?.name}</p>
                    <p className="text-dark">VS</p>
                    <p className="text-dark">{data?.awayTeam?.name}</p>
                </div>
            )}

            <div className={`grid ${data?.draw ? "grid-cols-3" : "grid-cols-2"} gap-1`}>
                {/* Home Team Cell */}
                <div className={`col-span-1 flex flex-col gap-1`}>
                    {data?.homeTeam?.bets?.map(
                        (item: any, index: number) => (
                            <div key={index} className={`py-2 bg-cell rounded-md flex items-center justify-between ${data?.draw ? "px-[15%]" : "px-[10%]"} text-xl`}>
                                <p className="text-primary">
                                    {data?.homeTeam?.category && (
                                        <span className="mr-2">{data?.homeTeam?.category}</span>
                                    )}
                                    <span className="tracking-wider">{item?.bet}</span>
                                </p>

                                <p className="text-dark font-medium">
                                    {item?.total}
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* Draw */}
                {data?.draw && (
                    <div className="col-span-1 flex flex-col gap-1">
                        {data?.draw?.bets?.map(
                            (item: any, index: number) => (
                                <div key={index} className={`py-2 bg-cell rounded-md flex items-center justify-between ${data?.draw ? "px-[15%]" : "px-[10%]"} text-xl`}>
                                    {data?.draw.name
                                        ? data?.draw.name
                                        : (
                                        <p className="text-primary tracking-wider">
                                            <AiOutlineClose />
                                        </p>
                                    )}

                                    <p className="text-dark font-medium">
                                        {item}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Away Team Cell */}
                <div className={`col-span-1 flex flex-col gap-1`}>
                    {data?.awayTeam?.bets?.map(
                        (item: any, index: number) => (
                            <div key={index} className={`py-2 bg-cell rounded-md flex items-center justify-between ${data?.draw ? "px-[15%]" : "px-[10%]"} text-xl`}>
                                <p className="text-primary">
                                    {data?.awayTeam?.category && (
                                        <span className="mr-2">{data?.awayTeam?.category}</span>
                                    )}

                                    <span className="tracking-wider">{item?.bet}</span>
                                </p>

                                <p className="text-dark font-medium">
                                    {item?.total}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default HandicapBetting;