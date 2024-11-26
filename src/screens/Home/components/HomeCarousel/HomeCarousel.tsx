import React, {Component, useState} from 'react';
import {View, Pressable, FlatList, Image, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './HomeCarousel.styles';
import IconPack from '../../../../utils/IconPack';
import Carousel from 'react-native-snap-carousel';
import CardPagination from '../../../../components/CardPagination';
import {colors} from '../../../../utils/colors';

const {width, height} = Dimensions.get('window');

const HomeCarousel = ({data}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSnapToItem = (index: number) => setCurrentIndex(index);

  return (
    <>
      <Carousel
        sliderWidth={width}
        sliderHeight={230}
        itemWidth={width}
        itemHeight={230}
        data={data}
        // autoplay={true}
        // loop={true}
        autoplayDelay={1000}
        onSnapToItem={onSnapToItem}
        renderItem={({item, index}) => (
          <Pressable
            key={`category${index}`}
            style={({pressed}) => styles.cardView}
            onPress={() => null}>
            <View style={styles.imageView}>
              <Image source={item.source} style={styles.image} />
            </View>
          </Pressable>
        )}
        hasParallaxImages={true}
      />
      {data.length > 1 && (
        <CardPagination
          length={data.length}
          index={currentIndex}
          fillColor={colors.black}
        />
      )}
    </>
  );
};

export default observer(HomeCarousel);
