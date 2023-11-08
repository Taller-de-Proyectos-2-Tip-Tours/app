import * as Linking from "expo-linking";
import { Share } from "react-native";

export const shareTourUseCase = async (tourId) => {
  const redirectUrl = Linking.createURL("tour", {
    queryParams: { tourId: tourId },
  });
  `tiptour://tour?tourId=${tourId}`;
  console.log("redirectUrl", redirectUrl);
  await Share.share({
    message: `Comparte este tour con tus amigos: ${redirectUrl}`,
  });
};
