import {typeTab} from './type';

//Action login
export const focusHomeTab = () => ({
  type: typeTab.HOME,
});

export const focusExploreTab = () => ({
  type: typeTab.EXPLORER,
});

export const focusLiveTalkTab = () => ({
  type: typeTab.LIVE_TALK,
});
