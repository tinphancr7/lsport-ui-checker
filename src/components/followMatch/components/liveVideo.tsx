import FootballFieldIcon from "@/components/icons/footballFieldIcon";
import PlayIcon from "@/components/icons/playIcons";
import Image from "next/image";
import {IoPieChart} from "react-icons/io5";

function LiveVideo() {
	const toolbars = [
		{
			key: "1",
			icon: <PlayIcon />,
		},
		{
			key: "2",
			icon: <FootballFieldIcon />,
		},
		{
			key: "3",
			icon: <IoPieChart />,
		},
	];

	const cssIcon = (key: string) => {
		switch (key) {
			case "1":
				return "border-1 border-primary text-primary";
			case "2":
				return "text-gray";
			case "3":
				return "text-gray border-1 border-gray-200";
		}
	};

	return (
		<>
			<div className="h-[237px] w-full bg-primary rounded-lg flex items-center justify-center text-light text-lg font-bold">
				Live Video
			</div>

			{/* Toolbar */}
			<div className="bg-light rounded-lg p-5">
				<div className="flex justify-end gap-5">
					{toolbars?.map((item: any) => (
						<span
							key={item.key}
							className={`cursor-pointer rounded-sm w-7 h-[21px] flex justify-center items-center ${cssIcon(
								item.key
							)}`}
						>
							{item.icon}
						</span>
					))}
				</div>
			</div>
		</>
	);
}

export default LiveVideo;
