import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { api } from '../../../services/api';
import { saveToken } from '../../../services/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

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

      router.replace(
        '/dashboard' as any
      );
    } catch (error: any) {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#F8F8F8',
          paddingHorizontal: 28,
          justifyContent: 'center',
        }}
      >
        {/* HERO */}

        <View
          style={{
            alignItems: 'center',
            marginBottom: 44,
          }}
        >
          <Text
            style={{
              fontSize: 42,
              marginBottom: 12,
            }}
          >
            🏹
          </Text>

          <Text
            style={{
              fontSize: 38,
              fontWeight: '700',
              color: '#111111',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            HorseArcher
          </Text>

          <Text
            style={{
              textAlign: 'center',
              color: '#777777',
              fontSize: 18,
              lineHeight: 28,
            }}
          >
            Master the art of{'\n'}
            horseback archery.
          </Text>
        </View>

        {/* LOGIN CARD */}

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            padding: 24,

            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 20,
            shadowOffset: {
              width: 0,
              height: 8,
            },

            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#666',
              marginBottom: 8,
            }}
          >
            Email
          </Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#BBBBBB"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={{
              height: 58,
              borderRadius: 18,
              backgroundColor: '#F4F4F4',
              paddingHorizontal: 18,
              marginBottom: 20,
              fontSize: 16,
            }}
          />

          <Text
            style={{
              fontSize: 15,
              color: '#666',
              marginBottom: 8,
            }}
          >
            Password
          </Text>

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#BBBBBB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              height: 58,
              borderRadius: 18,
              backgroundColor: '#F4F4F4',
              paddingHorizontal: 18,
              marginBottom: 24,
              fontSize: 16,
            }}
          />

          <Pressable
            onPress={handleLogin}
            style={{
              height: 58,
              borderRadius: 18,
              backgroundColor: '#111111',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              Sign In
            </Text>
          </Pressable>
        </View>

        {/* FOOTER */}

        <View
          style={{
            marginTop: 28,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#777777',
              fontSize: 17,
            }}
          >
            New to HorseArcher?
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: '700',
              color: '#111111',
            }}
          >
            Create Account
          </Text>
        </View>
      </View>

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              'rgba(255,255,255,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size="large"
              color="#111111"
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}