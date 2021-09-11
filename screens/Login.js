import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://whispering-headland-00232.herokuapp.com/user/signin';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Welcome', { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
         
          <PageTitle>flook</PageTitle>

          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.username == '' || values.password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  placeholder="username"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                <MyTextInput
                  placeholder="password"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Sign up</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
