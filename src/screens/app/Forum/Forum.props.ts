import { ETabForum } from "@constant";

export type IItemTopTab = {
    id: number,
    label: string,
    value: ETabForum
}

export type IItemTopTabSize = {
    x: number;
    width: number
}

export type IItemTab = {
    id: number;
  created_at: string;
  updated_at: string;
  name_en: string;
  name_vi: string;
  short_code: string;
  ranking: number;
  type: string;
}