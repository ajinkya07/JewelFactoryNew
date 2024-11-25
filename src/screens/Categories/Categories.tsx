import React, {Component} from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import {styles} from './Categories.styles';
import IconPack from '../../utils/IconPack';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/strings';
import {observer} from 'mobx-react';

const {width, height} = Dimensions.get('window');

// used for background color
const categoryDataSource = [
  {
    id: '1',
    bgColor: colors.bg1,
  },
  {
    id: '2',
    bgColor: colors.bg2,
  },
  {
    id: '3',
    bgColor: colors.bg3,
  },
  {
    id: '4',
    bgColor: colors.bg4,
  },
  {
    id: '5',
    bgColor: colors.bg5,
  },
  {
    id: '6',
    bgColor: colors.bg6,
  },
  {
    id: '7',
    bgColor: colors.bg7,
  },
  {
    id: '8',
    bgColor: colors.bg2,
  },
];

const categoryData = [
  {
    description: 'Rings',
  },
  {
    description: 'Diamonds',
  },
  {
    description: 'Diamonds',
  },
  {
    description: 'Diamonds',
  },
  {
    description: 'Diamonds',
  },
];

const Category = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categoryData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bottom10}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={`category-tab${index}`}
              style={({pressed}) => [
                styles.cardView,
                {
                  backgroundColor: pressed
                    ? colors.touchHighlightGray
                    : categoryDataSource[index].bgColor,
                },
              ]}
              onPress={() => null}>
              <>
                <View style={styles.nameView}>
                  <Text style={styles.categoryTitle}>
                    {strings.explore} {item.description}
                  </Text>
                  <Text numberOfLines={3} style={styles.categorySubTitle}>
                    {item?.description}
                  </Text>
                </View>
                <View style={styles.imageView}>
                  <Image
                    source={IconPack.APP_LOGO}
                    style={styles.categoryImage}
                  />
                </View>
              </>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default observer(Category);
