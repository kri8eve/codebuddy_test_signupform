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
import {validateEmail, validatePassword} from '../utils/validation';

export default function SignUpScreenOne() {
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const isFocused = useIsFocused();
  const {setUser, user} = useContext(SignUpContext);
  const {navigate} = useNavigation();
  function handlePasswordChange(val) {
    validatePassword(val)
      ? setShowPasswordInfo(false)
      : setShowPasswordInfo(true);
    setpassword(val);
  }
  function handleEmailChange(val) {
    validateEmail(val) ? setShowEmailInfo(false) : setShowEmailInfo(true);
    setemail(val);
  }

  function save() {
    setUser(prev => ({...prev, emailId: email, password}));
  }
  function saveAndNext() {
    if (!validateEmail(email)) {
      return;
    }
    save();
    navigate('screen-two');
  }

  useEffect(() => {
    if (!email || !password) {
      setDisabled(true);
    } else {
      if (validateEmail(email) && validatePassword(password)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    if (email !== '' && password !== '') {
      setDisabled(false);
    }
  }, [email, password]);

  useEffect(() => {
    setemail(user.emailId);
    setpassword(user.password);
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
          <TouchableOpacity disabled={true} style={{}}>
            <Text style={[formStyles.btn, formStyles.btnDisabled]}>Back</Text>
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
          {/* email */}
          <View style={{marginBottom: 10}}>
            <Text style={formStyles.label}>
              Email <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={formStyles.formInput}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter email"
              onFocus={() => setShowEmailInfo(true)}
              onBlur={() => {
                if (validateEmail(email)) {
                  setShowEmailInfo(false);
                }
              }}
            />
            {showEmailInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.EMAIL_INFO}</Text>
            ) : null}
          </View>

          {/* password */}
          <View style={{marginBottom: 10}}>
            <View style={{position: 'relative'}}>
              <Text style={formStyles.label}>
                Password <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={formStyles.formInput}
                placeholder="Enter password"
                onFocus={() => setShowPasswordInfo(true)}
                onBlur={() => {
                  if (validatePassword(password)) {
                    setShowPasswordInfo(false);
                  }
                }}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 8, top: 8}}
                onPress={() => setshowPassword(prev => !prev)}>
                <Text style={{fontSize: 10}}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {showPasswordInfo ? (
              <Text style={formStyles.info}>{FORM_INFOS.PASSWORD_INFO}</Text>
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
