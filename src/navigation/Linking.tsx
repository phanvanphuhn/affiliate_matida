import {EmitterSubscription, Linking} from 'react-native';
import reactotron from 'reactotron-react-native';

export default class LinkingService {
  static addLinkingListener = (
    onReceiveURL: (event: {url: string}) => void,
  ) => {
    return Linking.addEventListener('url', onReceiveURL);
  };

  static removeLinkingListener = (subscription: EmitterSubscription) => {
    Linking.removeSubscription(subscription);
  };

  static getInitialURL = async () => {
    return await Linking.getInitialURL();
  };
}

export const handleURL = (event: {url: string}) => {
  // const {path, queryParams} = Linking.parse(url);
  // Linking.
  reactotron.log?.('url');
};
