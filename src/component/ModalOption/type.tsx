export enum Option {
  REPORT,
  BLOCK,
}

export type IOption = {
  id: number;
  label: string;
  onPress: () => void;
  value: Option;
  icon: React.ReactNode;
};
