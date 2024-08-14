import { ReactNode } from "react";
import { SiteItem } from "./siteItem";
import { IconType } from "react-icons";

export enum SidebarTypes {
    CATEGORY = 'category',
    LINK = 'link'
}

export interface SidebarItem {
    type: SidebarTypes,
    title?: string,
    desc?: any,
    child?: SiteItem[]
}


export interface ISidebarProfile {
    title: string
    icon: IconType
    link: string
}