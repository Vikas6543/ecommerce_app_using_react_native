import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

const user = {
  email: 'vikas@gmail.com',
  password: '123456',
};

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // formik validation
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const onSubmitForm = async (values) => {
    if (values.email !== user.email || values.password !== user.password) {
      Alert.alert('Invalid Email or Password');
    }
    navigation.navigate('Dashboard');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text
        style={{
          fontSize: 26,
          color: 'black',
          marginBottom: 14,
          fontWeight: '500',
        }}
      >
        Login
      </Text>

      <Formik
        initialValues={{ email: 'vikas@gmail.com', password: '123456' }}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmitForm(values)}
      >
        {({
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          values,
          errors,
        }) => (
          <View style={{ width: '100%', paddingHorizontal: 30 }}>
            {/* email input */}
            <TextInput
              placeholder='Email Address'
              keyboardType='email-address'
              value={values.email}
              onChangeText={handleChange('email')}
              style={[
                styles.textInput,
                {
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  borderColor: touched.email && errors.email ? 'red' : 'black',
                  borderWidth: 1.2,
                  paddingVertical: 8,
                },
              ]}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 6,
                  marginLeft: 6,
                }}
              >
                {errors.email}
              </Text>
            )}

            {/* password input */}
            <TextInput
              placeholder='Password'
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
              style={[
                styles.textInput,
                {
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginTop: 20,
                  borderColor:
                    touched.password && errors.password ? 'red' : 'black',
                  borderWidth: 1.2,
                  paddingVertical: 8,
                },
              ]}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 6,
                  marginLeft: 6,
                }}
              >
                {errors.password}
              </Text>
            )}

            {/* login button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {loading ? (
                  <ActivityIndicator size='small' color='#fff' />
                ) : (
                  'Login'
                )}
              </Text>
            </TouchableOpacity>

            {/* dont have an account */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  marginTop: 30,
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#444345',
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}
              >
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* social login */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 18,
          gap: 12,
        }}
      >
        <Text
          style={{
            width: 75,
            backgroundColor: 'black',
            height: 1,
          }}
        ></Text>
        <Text style={{ paddingBottom: 4 }}>or login with</Text>
        <Text
          style={{
            width: 75,
            backgroundColor: 'black',
            height: 1,
          }}
        ></Text>
      </View>

      <TouchableOpacity style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderWidth: 1,
            borderColor: '#444345',
            borderRadius: 8,
            marginHorizontal: 30,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Image
            source={require('../../assets/google.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#444345',
              fontWeight: 'bold',
            }}
          >
            Login with Google
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#673AB7',
    padding: 13,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Login;
