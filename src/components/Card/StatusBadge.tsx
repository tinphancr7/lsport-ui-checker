import {generateMatchTime, generateStatus} from "@/utils";

const StatusBadge = ({
	status,
	matchTime,
	halfStartTime,
}: {
	status: number;
	matchTime: string;
	halfStartTime: string;
}) => (
	<span className="text-base max-md:text-sm">
		{generateMatchTime({
			matchTime,
			status,
			halfStartTime,
		})}
	</span>
);

export default StatusBadge;
