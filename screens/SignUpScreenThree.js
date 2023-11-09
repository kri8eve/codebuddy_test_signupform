/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import formStyles from '../styles/formStyles';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import FormSubmitSuccessModal from '../components/FormSubmitSuccessModal';
import {useContext} from 'react';
import {SignUpContext} from '../providers/SignUpProvider';
import {useIsFocused} from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
import {FORM_INFOS} from '../utils/constants';
import {validatePhonenumber} from '../utils/validation';

const data = [
  {label: 'India (+91)', value: '+91'},
  {label: 'America (+1)', value: '+1'},
];

export default function SignUpScreenThree() {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneNumberInfo, setShowPhoneNumberInfo] = useState(false);
  const [acceptTC, setAcceptTC] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {user, setUser} = useContext(SignUpContext);
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();

  function handlePhoneNumberChange(val) {
    validatePhonenumber(val)
      ? setShowPhoneNumberInfo(false)
      : setShowPhoneNumberInfo(true);
    setPhoneNumber(val);
  }

  function back() {
    navigate('screen-two');
  }
  function save() {
    setUser(prev => ({...prev, countryCode, phoneNumber}));
    if (!countryCode) {
      Alert.alert('Please select country code');
      return;
    }
    if (!validatePhonenumber(phoneNumber)) {
      return;
    }
    // if (!acceptTC) {
    //   Alert.alert('Please accept terms and condition to proceed');
    //   return;
    // }
    setModalVisible(true);
  }

  useEffect(() => {
    setCountryCode(user.countryCode);
    setPhoneNumber(user.phoneNumber);
  }, [isFocused]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={back}>
            <Text style={[formStyles.btn, formStyles.backBtnEnabled]}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disbaled={true}>
            <Text style={[formStyles.btn, formStyles.btnDisabled]}>
              Save & Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>
              Country code <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={countryCode}
              onChange={item => {
                setCountryCode(item.value);
              }}
            />
          </View>

          {/* phone number */}
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>
              Phone number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={[formStyles.formInput]}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="Enter phone number"
              onFocus={() => setShowPhoneNumberInfo(true)}
              onBlur={() => {
                if (!phoneNumber || validatePhonenumber(phoneNumber)) {
                  setShowPhoneNumberInfo(false);
                }
              }}
            />

            {showPhoneNumberInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.PHONENUMBER_INFO}</Text>
            ) : null}
          </View>

 
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <CheckBox value={acceptTC} onValueChange={p => setAcceptTC(p)} />
              <Text onPress={() => setAcceptTC(p => !p)}>
                Accept Terms and Conditions
              </Text>
            </View> */}
       
          <View style={{paddingVertical: 20}}>
            <TouchableOpacity onPress={save}>
              <Text style={[formStyles.btn, formStyles.saveBtnEnabled]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FormSubmitSuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}
