export interface IBaby {
  id: number;
  image: string[] | null;
  is_preview: boolean;
  name_en: string | null;
  name_vn: string | null;
  type: number | null;
  week: number | null;
  content: string | null;
  title: string | null;
  remaining_week?: number | null;
}
export interface IBabyProgress {
  baby: IBaby;
  baby_size: IBaby;
  mom: IBaby;
}

export interface IArticles {
  id: number;
  content_vi: string | null;
  content_en: string | null;
  created_at: string;
  image: string | null;
  is_popular: boolean;
  is_payment: boolean;
  is_paid: boolean;
  mood: string | null;
  title_en: string | null;
  title_vi: string | null;
  topic: string | null;
  trimester: number | null;
  updated_at: string | null;
  week: string | null;
}

export interface IPosts {
  id: number;
  commentCount: number | null;
  content: string | null;
  created_at: string | null;
  image: string | null;
  likeCount: number | null;
  title: string | null;
  type_user: number | null;
  updated_at: string | null;
  user: any | null;
  user_id: number | null;
}

export interface IVideo {
  id: number;
  title_en: string | null;
  title_vi: string | null;
  updated_at: string | null;
  url: string | null;
  week: number | null;
}

export interface IQuote {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  week: number | null;
  content_en: string | null;
  content_vi: string | null;
}
