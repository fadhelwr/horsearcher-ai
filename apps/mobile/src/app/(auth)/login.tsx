import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { api } from '../../../services/api';
import { saveToken } from '../../../services/auth';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        }
      );

      await saveToken(
        response.data.accessToken
      );

      router.replace('/dashboard' as any);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Login Failed',
        error?.response?.data?.message ??
          'Invalid credentials'
      );
    } finally {
      setLoading(false);
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
          borderColor: '#D1D5DB',
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 16,
          backgroundColor: '#FFFFFF',
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
          borderColor: '#D1D5DB',
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 24,
          backgroundColor: '#FFFFFF',
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

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.15)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor:
                'rgba(255,255,255,0.9)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size="large"
              color="#2563EB"
            />
          </View>
        </View>
      )}
    </ThemedView>
  );
}
