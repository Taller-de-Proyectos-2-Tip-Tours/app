import React from "react";
import Carousel from "react-native-snap-carousel";
import { View, Image } from "react-native";

export const PhotoCarousel = ({ photos, style }) => {
  return (
    <Carousel
      data={photos}
      style={style}
      renderItem={({ item }) => (
        <View>
          <Image style={style} source={{ uri: item }} />
        </View>
      )}
      sliderWidth={style.width}
      itemWidth={style.width}
      loop={true}
      autoplay={true}
      autoplayInterval={5000}
    />
  );
};
