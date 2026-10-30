import { useState } from 'react';
import {
    Alert,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { api } from '../../services/api';
import { getToken, saveToken } from '../../services/auth';

import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { router } from 'expo-router';





export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    await saveToken(response.data.accessToken);

    const token = await getToken();

    console.log('TOKEN:', token);

    console.log('BEFORE ROUTE');

    router.push('/dashboard');

    console.log('AFTER ROUTE');

    console.log(response.data);
  } catch (error: any) {
        console.log('ERROR FULL:', error);
        console.log('ERROR RESPONSE:', error?.response);
        console.log('ERROR DATA:', error?.response?.data);

        Alert.alert(
            'Login Failed',
            JSON.stringify(error?.response?.data ?? error.message)
        );
        }
    };

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View
        style={{
          marginBottom: 40,
        }}
      >
        <ThemedText
          type="title"
          style={{
            marginBottom: 8,
          }}
        >
          🐎 HorseArcher
        </ThemedText>

        <ThemedText>
          Master the path of horseback archery.
        </ThemedText>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 16,
          backgroundColor: '#fff',
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 24,
          backgroundColor: '#fff',
        }}
      />

      <Pressable
        onPress={handleLogin}
        style={{
            height: 56,
            borderRadius: 16,
            backgroundColor: '#2563EB',
            alignItems: 'center',
            justifyContent: 'center',
        }}
     >
        <ThemedText
          style={{
            color: 'white',
            fontWeight: '700',
          }}
        >
          Login
        </ThemedText>
      </Pressable>

      <ThemedText
        style={{
          textAlign: 'center',
          marginTop: 24,
          opacity: 0.7,
        }}
      >
        New to HorseArcher? Create an account
      </ThemedText>
    </ThemedView>
  );
}