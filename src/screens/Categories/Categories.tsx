import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import {styles} from './Categories.styles';
import IconPack from '../../utils/IconPack';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/strings';
import {observer} from 'mobx-react';
import RootStore from '../../stores/RootStore';
import {constatnts} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();

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

  const onPressCategory = (data: any) => {
    // @ts-ignore
    navigation.navigate('ProductList', {title: data.col_name});
  };

  // {"col_name": "SET", "created": "2023-12-18 06:30:40", "created_date": "18-12-2023", "id": "83", "image_name": "WhatsApp_Image_2023-11-28_at_19_16_171.jpg", "latest": 1, "position": "1", "short_code": "S", "subcategory": [Array]}
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RootStore.homeStore.collectionData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}: any) => {
          return (
            <Pressable
              key={`category-tab${index}`}
              style={({pressed}) => [
                styles.cardView,
                {
                  backgroundColor:
                    categoryDataSource[
                      Number(index % categoryDataSource.length)
                    ]?.bgColor,
                },
              ]}
              onPress={() => onPressCategory(item)}>
              <>
                <Text adjustsFontSizeToFit={true} style={styles.categoryTitle}>
                  {item.col_name}
                </Text>

                <Image
                  source={
                    item.image_name != ''
                      ? {uri: constatnts.IMAGE_URL + item.image_name}
                      : IconPack.APP_LOGO
                  }
                  style={styles.categoryImage}
                />
              </>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default observer(Category);
