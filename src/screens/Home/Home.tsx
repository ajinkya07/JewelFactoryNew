import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import {styles} from './Home.styles';
import {observer} from 'mobx-react';
import HomeCategories from './components/HomeCategories/HomeCategories';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import RootStore from '../../stores/RootStore';
import {getDeviceId} from '../../utils/helper';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';

const Home = () => {
  useEffect(() => {
    callHomePageApis();
  }, []);

  const callHomePageApis = async () => {
    const userId = RootStore.appStore.userId;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';
    let uniqueId = await getDeviceId();

    const params = new FormData();

    params.append('user_id', userId);
    params.append('image_type', type);
    params.append('device_id', uniqueId);

    RootStore.homeStore.getHomeDataApi(params);

    const params2 = new FormData();
    params2.append('user_id', userId);

    RootStore.homeStore.getAllParameterApi(params2);
  };

  const onRefresh = () => {
    callHomePageApis();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent showAppIcon={true} isBack={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.scrollStyle}
        contentContainerStyle={styles.contentContainerStyle}>
        {RootStore.homeStore.isHomeApiLoading ? (
          <View style={styles.loader}>
            <LoadingComponent />
          </View>
        ) : (
          <>
            <HomeCarousel data={RootStore.homeStore.carouselData} />
            <HomeCategories data={RootStore.homeStore.collectionData} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Home);
