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

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel data={categoryData} />
        <HomeCategories data={categoryData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Home);
