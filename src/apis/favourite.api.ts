import { FixtureScoreboardStatus } from "@/constants/enum";
import http from "@/utils/http";

export enum FAVOURITE_TYPE {
    MATCH = "MATCH",
    BLOG = "BLOG",
}

export interface QueryFavouriteByStatus {
    status?: FixtureScoreboardStatus;
    pageIndex: string | number;
    pageSize: string | number;
}

export const favouriteApi = {
    addFavourite: (data: any) => {
        return http.post("/favourites", data);
    },

    getFavouritesByStatus: (query: QueryFavouriteByStatus) => {
        return http.get("/favourites", {
            params: query
        }
    )},
};

export const { addFavourite, getFavouritesByStatus } = favouriteApi;
