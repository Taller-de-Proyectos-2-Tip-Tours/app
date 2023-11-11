import { Share } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";

export const shareTourUseCase = async (tourId) => {
  const link = await dynamicLinks().buildLink({
    link: `https://codecrafter.page.link/tour/${tourId}`,
    domainUriPrefix: `https://codecrafter.page.link`,
    android: {
      packageName: "com.codecrafter.TipTour",
    },
  });
  console.log("Generated link for sharing: ", link);
  await Share.share({
    message: `Comparte este tour con tus amigos: ${link}`,
  });
};
