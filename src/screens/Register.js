import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // formik validation
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const registerUser = async (values) => {
    // try {
    //   const response = await axios.post(
    //     'http://192.168.229.251:5000/user/register',
    //     {
    //       name: values.name,
    //       email: values.email,
    //       password: values.password,
    //     }
    //   );
    //   console.log(response);
    //   // navigation.navigate('Login');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onSubmitForm = (values) => {
    registerUser(values);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'white',
      }}
    >
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
          Register
        </Text>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
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
              {/* name input */}
              <TextInput
                placeholder='Name'
                value={values.name}
                onChangeText={handleChange('name')}
                style={[
                  styles.textInput,
                  {
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    borderColor: touched.name && errors.name ? 'red' : 'black',
                    borderWidth: 1.2,
                    paddingVertical: 8,
                  },
                ]}
                onBlur={handleBlur('name')}
                onT
              />
              {touched.name && errors.name && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    marginTop: 6,
                    marginLeft: 6,
                  }}
                >
                  {errors.name}
                </Text>
              )}

              {/* email input */}
              <View
                style={{
                  marginVertical: 25,
                }}
              >
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
                      borderColor:
                        touched.email && errors.email ? 'red' : 'black',
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
              </View>

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

              {/* register button */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {loading ? (
                    <ActivityIndicator size='small' color='#fff' />
                  ) : (
                    'Register'
                  )}
                </Text>
              </TouchableOpacity>

              {/* already have an account */}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    marginTop: 30,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#444345',
                    fontWeight: 'bold',
                  }}
                >
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
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

export default Register;
