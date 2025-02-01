import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';
import {Country, State, City} from 'country-state-city';
import {styles} from './ResidentialModalComponent.styles.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import {strings} from '../../utils/strings.ts';
import Divider from '../Divider.tsx';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../PressableComponent/PressableComponent.tsx';
import {colors} from '../../utils/colors.ts';
import RootStore from '../../stores/RootStore.js';

const ResidentialModalComponent = ({
  isModalVisible,
  setModalVisible,
  initialCountryId,
  initialStateId,
  initialCityId,
}: any) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    initialCountryId || null,
  );
  const [selectedState, setSelectedState] = useState(initialStateId || null);
  const [selectedCity, setSelectedCity] = useState(initialCityId || null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  useEffect(() => {
    const countryList = Country.getAllCountries().map((country, index) => ({
      label: country.name,
      value: (index + 1).toString(),
      isoCode: country.isoCode,
    }));
    setCountries(countryList);

    if (initialCountryId) {
      const selectedCountryData = countryList.find(
        country => country.value === initialCountryId,
      );
      if (selectedCountryData) {
        const stateList = State.getStatesOfCountry(
          selectedCountryData.isoCode,
        ).map((state, index) => ({
          label: state.name,
          value: (index + 1).toString(),
          isoCode: state.isoCode,
        }));
        setStates(stateList);

        if (initialStateId) {
          const selectedStateData = stateList.find(
            state => state.value === initialStateId,
          );

          if (selectedStateData) {
            const cityList = City.getCitiesOfState(
              selectedCountryData.isoCode,
              selectedStateData.isoCode,
            ).map((city, index) => ({
              label: city.name,
              value: (index + 1).toString(),
            }));
            setCities(cityList);
          }
        }
      }
    }
  }, [initialCountryId, initialStateId, initialCityId]);

  useEffect(() => {
    if (selectedCountry !== null) {
      const selectedCountryData = countries.find(
        country => country.value === selectedCountry,
      );

      if (selectedCountryData) {
        const stateList = State.getStatesOfCountry(
          selectedCountryData.isoCode,
        ).map((state, index) => ({
          label: state.name,
          value: (index + 1).toString(),
          isoCode: state.isoCode,
        }));
        setStates(stateList);
        setSelectedState(null);
        setSelectedCity(null);
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== null && selectedCountry !== null) {
      const selectedCountryData = countries.find(
        country => country.value === selectedCountry,
      );
      const selectedStateData = states.find(
        state => state.value === selectedState,
      );

      if (selectedCountryData && selectedStateData) {
        const cityList = City.getCitiesOfState(
          selectedCountryData.isoCode,
          selectedStateData.isoCode,
        ).map((city, index) => ({
          label: city.name,
          value: (index + 1).toString(),
        }));
        setCities(cityList);
        setSelectedCity(null);
      }
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const onCountryOpen = () => {
    setStateOpen(false);
    setCityOpen(false);
  };

  const onStateOpen = () => {
    setCountryOpen(false);
    setCityOpen(false);
  };

  const onCityOpen = () => {
    setCountryOpen(false);
    setStateOpen(false);
  };

  const getSelectedData = () => {
    const countryData = countries.find(
      country => country.value === selectedCountry,
    );
    const stateData = states.find(state => state.value === selectedState);
    const cityData = cities.find(city => city.value === selectedCity);

    return {
      country: countryData?.label || '',
      state: stateData?.label || '',
      city: cityData?.label || '',
      countryIndex: selectedCountry,
      stateIndex: selectedState,
      cityIndex: selectedCity,
      countryIsoCode: countryData?.isoCode || '',
      stateIsoCode: stateData?.isoCode || '',
    };
  };

  const handleContinue = () => {
    const selectedData = getSelectedData();
    RootStore.menuStore.setFields('residentialData', selectedData);
    setModalVisible(false);
    console.log('Selected Data:', selectedData);
  };

  const isContinueEnabled = selectedCountry && selectedState && selectedCity;

  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      style={styles.modalStyle}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection="down"
      propagateSwipe>
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.titleText}>{strings.SelectResidential}</Text>
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                searchable={true}
                dropDownDirection="BOTTOM"
                searchTextInputStyle={styles.searchInput}
                open={countryOpen}
                value={selectedCountry}
                items={countries}
                setOpen={setCountryOpen}
                setValue={setSelectedCountry}
                setItems={setCountries}
                placeholder="Select Country"
                style={styles.dropdown}
                onOpen={onCountryOpen}
                zIndex={3000}
                zIndexInverse={1000}
                searchPlaceholder={strings.Search}
                maxHeight={300}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={styles.dropdownListContainer}
              />
              <View style={styles.dropdownSpacing} />
              <DropDownPicker
                searchable={true}
                open={stateOpen}
                value={selectedState}
                items={states}
                setOpen={setStateOpen}
                setValue={setSelectedState}
                setItems={setStates}
                placeholder="Select State"
                style={styles.dropdown}
                searchTextInputStyle={styles.searchInput}
                disabled={!selectedCountry}
                onOpen={onStateOpen}
                zIndex={2000}
                zIndexInverse={2000}
                searchPlaceholder={strings.Search}
                maxHeight={230}
                dropDownDirection="BOTTOM"
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={styles.dropdownListContainer}
              />
              <View style={styles.dropdownSpacing} />
              <DropDownPicker
                searchable={true}
                open={cityOpen}
                value={selectedCity}
                items={cities}
                setOpen={setCityOpen}
                setValue={setSelectedCity}
                setItems={setCities}
                placeholder="Select City"
                style={styles.dropdown}
                searchTextInputStyle={styles.searchInput}
                disabled={!selectedState}
                onOpen={onCityOpen}
                zIndex={1000}
                zIndexInverse={3000}
                searchPlaceholder={strings.Search}
                dropDownDirection="TOP"
                maxHeight={200}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={styles.dropdownListContainer}
              />
            </View>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.Continue}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              onPress={handleContinue}
              disabled={!isContinueEnabled}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default observer(ResidentialModalComponent);
