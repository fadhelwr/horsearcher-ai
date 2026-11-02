import {
  Alert,
  Pressable,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { removeToken } from '../../../services/auth';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function ProfileScreen() {
  const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await removeToken();

          router.replace('/login' as any);
        },
      },
    ]
  );
};

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ThemedView
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.6,
          }}
        >
          Account
        </ThemedText>

        <ThemedText
          type="title"
          style={{
            marginBottom: 24,
          }}
        >
          Profile
        </ThemedText>

        <ThemedView
          style={{
            borderRadius: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            marginBottom: 24,
          }}
        >
          <ThemedText
            style={{
              opacity: 0.6,
              marginBottom: 4,
            }}
          >
            Name
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            Fadhel
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: '#EF4444',
            borderRadius: 16,
            padding: 16,
          }}
        >
          <ThemedText
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            Logout
          </ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}