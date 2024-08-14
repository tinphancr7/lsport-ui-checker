import useQueryParams from "./useQueryParams";
import {isNil, isUndefined, omitBy} from "lodash";
export type QueryConfig = {
	[key in keyof any]: string;
};
const isNilOrEmpty = (value: any) => isNil(value) || value === "";
const useQueryConfig = () => {
	const queryParams = useQueryParams();
	const queryConfig: QueryConfig = omitBy(
		{
			page: queryParams.page,
			limit: queryParams.limit,
			tab: queryParams.tab,
			search: queryParams.search,
			preHours: queryParams.preHours,
			pos: queryParams.pos,
		},
		isNilOrEmpty
	);
	return queryConfig;
};

export default useQueryConfig;
