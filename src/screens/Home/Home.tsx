import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './Home.styles';
import {observer} from 'mobx-react';
import {strings} from '../../utils/strings';
import {colors} from '../../utils/colors';
import IconPack from '../../utils/IconPack';
import HomeCategories from './components/HomeCategories/HomeCategories';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import {PRODUCT_DATA} from '../Product/ProductList/productsData';

const Home = () => {
  const DATA = PRODUCT_DATA();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel data={DATA} />
        <HomeCategories data={DATA} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Home);
