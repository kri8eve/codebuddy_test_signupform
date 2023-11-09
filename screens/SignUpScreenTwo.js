/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import formStyles from '../styles/formStyles';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {SignUpContext} from '../providers/SignUpProvider';
import {FORM_INFOS} from '../utils/constants';
import {
  validateAddress,
  validateFirstName,
  validateLastName,
} from '../utils/validation';

export default function SignUpScreenTwo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [showFirstnameInfo, setShowFirstnameInfo] = useState(false);
  const [showLastnameInfo, setShowLastnameInfo] = useState(false);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const isFocused = useIsFocused();
  const {setUser, user} = useContext(SignUpContext);
  const {navigate} = useNavigation();
  function handleFirstnameChange(val) {
    validateFirstName(val)
      ? setShowFirstnameInfo(false)
      : setShowFirstnameInfo(true);
    setFirstName(val);
  }
  function handleLastnameChange(val) {
    validateLastName(val)
      ? setShowLastnameInfo(false)
      : setShowLastnameInfo(true);
    setLastName(val);
  }
  function handleAddressChange(val) {
    validateAddress(val) ? setShowAddressInfo(false) : setShowAddressInfo(true);
    setAddress(val);
  }

  function back() {
    navigate('screen-one');
  }
  function save() {
    setUser(prev => ({...prev, firstName, lastName, address}));
  }
  function saveAndNext() {
    save();
    navigate('screen-three');
  }

  useEffect(() => {
    if (!firstName || !address) {
      setDisabled(true);
    } else {
      if (validateFirstName(firstName) && validateAddress(address)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [firstName, address, lastName]);

  useEffect(() => {
    if (user.firstName !== '' && !validateFirstName(user.firstName)) {
      setShowFirstnameInfo(true);
    }
    if (user.lastName !== '' && !validateLastName(user.lastName)) {
      setShowLastnameInfo(true);
    }
    if (user.address !== '' && !validateAddress(user.address)) {
      setShowAddressInfo(true);
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAddress(user.address);
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
          <TouchableOpacity onPress={back} style={{}}>
            <Text style={[formStyles.btn, formStyles.backBtnEnabled]}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveAndNext} disabled={disabled}>
            <Text
              style={[
                formStyles.btn,
                disabled ? formStyles.btnDisabled : formStyles.saveBtnEnabled,
              ]}>
              Save & Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {/* firstName */}
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>
              First name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={formStyles.formInput}
              value={firstName}
              onChangeText={handleFirstnameChange}
              placeholder="Enter firstName"
              onFocus={() => setShowFirstnameInfo(true)}
              onBlur={() => {
                if (!firstName || validateFirstName(firstName)) {
                  setShowFirstnameInfo(false);
                }
              }}
            />
            {showFirstnameInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.FIRSTNAME_INFO}</Text>
            ) : null}
          </View>

          {/* lastName */}
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>Last name</Text>
            <TextInput
              style={formStyles.formInput}
              value={lastName}
              onChangeText={handleLastnameChange}
              placeholder="Enter lastName"
              onFocus={() => setShowLastnameInfo(true)}
              onBlur={() => {
                if (!lastName || validateLastName(lastName)) {
                  setShowLastnameInfo(false);
                }
              }}
            />
            {showLastnameInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.LASTNAME_INFO}</Text>
            ) : null}
          </View>

          {/* address */}
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>
              Address <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={formStyles.formInput}
              value={address}
              onChangeText={handleAddressChange}
              placeholder="Enter address"
              onFocus={() => setShowAddressInfo(true)}
              onBlur={() => setShowAddressInfo(false)}
            />
            {showAddressInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.ADDRESS_INFO}</Text>
            ) : null}
          </View>

          <View style={{paddingVertical: 20}}>
            <TouchableOpacity onPress={save}>
              <Text style={[formStyles.btn, formStyles.saveBtnEnabled]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
