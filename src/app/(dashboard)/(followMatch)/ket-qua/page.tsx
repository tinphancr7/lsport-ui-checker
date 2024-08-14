const FilterResult = dynamic(() => import("./components/FilterResult"));
import dynamic from "next/dynamic";
const ResultList = dynamic(() => import("./components/ResultList"));

const ResultPage = () => {
	return (
		<div>
			<FilterResult />
			<ResultList />
		</div>
	);
};

export default ResultPage;
