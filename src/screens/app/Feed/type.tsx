export type IDataListFeed = {
  audio?: string;
  content_type: 'podcast' | 'article' | 'video';
  contentid: string;
  created_at: string;
  desc: string;
  duration: number;
  id: number;
  image?: string;
  is_payment: number;
  lang: 'vi';
  price_vn: number;
  rank: number;
  speaker_bio: string;
  speaker_name: string;
  title: string;
  topic: string;
  total_views: number;
  trimester: string;
  updated_at: string;
  url?: string;

  /**
   * content_type: "video"
   */
  description: string;
  durations: number;
  expert_image?: string;
  expert_name?: string;
  thumbnail?: string;
  views: number;

  /**
   * content_type: "article"
   */
  content: string;
  is_popular: number;
  is_show: number;
  mood: string;
  podcast: string;
  week: string;
};
