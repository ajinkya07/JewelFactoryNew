import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {strings} from '../../../../../utils/strings';
import {styles} from './ViewAsModal.styles';
import Divider from '../../../../../components/Divider';
import {colors} from '../../../../../utils/colors';
import IconPack from '../../../../../utils/IconPack';

const ViewAsModal = ({
  isModalVisible,
  setModalVisible,
  setSelectedViewStyleId,
}: any) => {
  const VerticalSquareView = () => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedViewStyleId('1')}
        activeOpacity={0.8}
        style={styles.viewAsItemView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.squareView,
              {
                backgroundColor: colors.pressedColorOpacity2,
              },
            ]}>
            <Text style={styles.subtitleText}>1</Text>
          </View>

          <View
            style={[
              styles.squareView,
              {
                backgroundColor: colors.pressedColorOpacity2,
              },
            ]}>
            <Text style={styles.subtitleText}>2</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.squareView,
              {
                backgroundColor: colors.pressedColorOpacity2,
              },
            ]}>
            <Text style={styles.subtitleText}>3</Text>
          </View>
          <View
            style={[
              styles.squareView,
              {
                backgroundColor: colors.pressedColorOpacity2,
              },
            ]}>
            <Text style={styles.subtitleText}>4</Text>
          </View>
        </View>
        <View style={styles.arrowDownAbsView}>
          <Image source={IconPack.DOWN_ARROW} style={styles.downArrowImg} />
        </View>
      </TouchableOpacity>
    );
  };

  // 2
  const VerticalRectangleView = () => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedViewStyleId('2')}
        activeOpacity={0.8}
        style={styles.viewAsItemView}>
        <View
          style={[
            styles.rectangleView,
            {
              backgroundColor: colors.pressedColorOpacity2,
            },
          ]}>
          <Text style={styles.subtitleText}>1</Text>
        </View>
        <View
          style={[
            styles.rectangleView,
            {
              backgroundColor: colors.pressedColorOpacity2,
            },
          ]}>
          <Text style={styles.subtitleText}>2</Text>
        </View>
        <View style={styles.arrowDownAbsView}>
          <Image source={IconPack.DOWN_ARROW} style={styles.downArrowImg} />
        </View>
      </TouchableOpacity>
    );
  };

  // 3
  const HorizontalRectangleView = () => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedViewStyleId('3')}
        activeOpacity={0.8}
        style={[styles.viewAsItemView, {flexDirection: 'row'}]}>
        <View
          style={[
            styles.horizontalRectangle,
            {
              backgroundColor: colors.pressedColorOpacity2,
            },
          ]}>
          <Text style={styles.subtitleText}>1</Text>
        </View>
        <View
          style={[
            styles.horizontalRectangle,
            {
              backgroundColor: colors.pressedColorOpacity2,
            },
          ]}>
          <Text style={styles.subtitleText}>2</Text>
        </View>
        <View style={styles.arrowDownAbsViewForRightSwipe}>
          <Image
            source={IconPack.DOWN_ARROW}
            style={[styles.downArrowImg, styles.rightArrow]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // 4
  const SingleSquareView = () => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedViewStyleId('4')}
        activeOpacity={0.8}
        style={[styles.viewAsItemView, {flexDirection: 'row'}]}>
        <View
          style={[
            styles.singleSquare,
            {
              backgroundColor: colors.pressedColorOpacity2,
            },
          ]}>
          <Text style={styles.subtitleText}>1</Text>
        </View>

        <View style={styles.singleAbsView}>
          <Image source={IconPack.DOWN_ARROW} style={styles.downArrowImg} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalView}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      animationInTiming={600}
      animationOutTiming={500}
      swipeDirection="down"
      propagateSwipe>
      <View style={styles.modalViewContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.titleText}>{strings.viewAs}</Text>

        <Text style={styles.subtitleText}>{strings.viewAsDesc}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentStyle}>
          <View style={styles.padding10}>
            <VerticalSquareView />
          </View>
          <View style={styles.padding10}>
            <VerticalRectangleView />
          </View>
          <View style={styles.padding10}>
            <HorizontalRectangleView />
          </View>
          <View style={styles.padding10}>
            <SingleSquareView />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ViewAsModal;
