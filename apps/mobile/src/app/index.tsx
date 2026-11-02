import { useEffect } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { getToken } from '../../services/auth';

export default function HomeScreen() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (token) {
        router.replace('/dashboard' as any);
      } else {
        router.replace('/login' as any);
      }
    };

    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />
    </View>
  );
}