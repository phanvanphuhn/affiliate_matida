import { ETopicFeedBack } from "@constant";

export type IFormikFeedback = {
  help: string;
  topic: number[];
  other: string;
};

export type ITopicFeedback = {
  id: number,
  label: string,
  value: ETopicFeedBack
}

export type HelpComponentProps = {
  data: any
}

export type  TopicComponentProps = HelpComponentProps