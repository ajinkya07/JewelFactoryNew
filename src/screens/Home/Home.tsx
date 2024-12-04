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

const Home = () => {
  useEffect(() => {
    callHomePageApis();
  }, []);

  const callHomePageApis = async () => {
    const userId = global.userId;

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.scrollStyle}>
        {RootStore.homeStore.isHomeApiLoading ? (
          <View
            style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
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
