import * as Linking from "expo-linking";
import { Share } from "react-native";
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const shareTourUseCase = async (tourId) => {
  const link = await dynamicLinks().buildLink({
    link: 'https://codecrafter.page.link',
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://codecrafter.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    android: {
      packageName: 'com.codecrafter.TipTour',
    }
  });
  const redirectUrl =  Linking.createURL("tour", {
    queryParams: { tourId: tourId },
  });
  `https://codecrafter.page.link/tourId=${tourId}`;
  console.log("redirectUrl", redirectUrl);
  await Share.share({
    message: `Comparte este tour con tus amigos: ${redirectUrl}`,
  });
};
