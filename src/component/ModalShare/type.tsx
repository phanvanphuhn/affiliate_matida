import {OPTION_SHARE, TypeDeepLink} from '@constant';

export interface IItemShare {
  id: number;
  label: string;
  value: OPTION_SHARE;
  icon: Element;
  onPress: () => void;
}

export interface IModalShare {
  open: () => void;
  close: () => void;
}

export type Props = {
  typeShare: TypeDeepLink;
  id: string;
};
