import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { api } from '../../../services/api';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function DashboardScreen() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [lastTraining, setLastTraining] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      const dashboardResponse =
        await api.get('/dashboard');

      console.log(
        'DASHBOARD RESPONSE:',
        dashboardResponse.data
      );

      setDashboard(dashboardResponse.data);

      try {
        const trainingResponse =
          await api.get('/training-sessions');

        console.log(
          'TRAINING RESPONSE:',
          trainingResponse.data
        );

        if (trainingResponse.data.length > 0) {
          setLastTraining(
            trainingResponse.data[0]
          );
        }
      } catch (trainingError: any) {
        console.log(
          'TRAINING URL:',
          trainingError?.config?.url
        );

        console.log(
          'TRAINING STATUS:',
          trainingError?.response?.status
        );

        console.log(
          'TRAINING DATA:',
          trainingError?.response?.data
        );
      }
    } catch (error: any) {
      console.log(
        'FAILED URL:',
        error?.config?.url
      );

      console.log(
        'FAILED STATUS:',
        error?.response?.status
      );

      console.log(
        'FAILED DATA:',
        error?.response?.data
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  if (loading) {
    return (
      <ThemedView
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
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemedText>
          Failed to load dashboard
        </ThemedText>
      </ThemedView>
    );
  }

  if (!dashboard) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemedText>
          No dashboard data
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 16,
        }}
      >
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.6,
          }}
        >
          Welcome back 👋
        </ThemedText>

        <ThemedText
          type="title"
          style={{
            marginBottom: 10,
            fontSize: 36,
          }}
        >
          {dashboard.name}
        </ThemedText>

        <View
          style={{
            backgroundColor: '#2563EB',
            borderRadius: 24,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <ThemedText
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 12,
              letterSpacing: 1,
            }}
          >
            LEVEL {dashboard.level} : {dashboard.xp} XP
          </ThemedText>

          <ThemedText
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              marginTop: 12,
            }}
          >
            Horseback Archery
          </ThemedText>

          <View
            style={{
              marginTop: 20,
              marginBottom: 16,
            }}
          >
            <ThemedText
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 12,
              }}
            >
              LAST TRAINING
            </ThemedText>

            <ThemedText
              style={{
                color: 'white',
                marginTop: 4,
              }}
            >
              {lastTraining?.trainingPlanTitle ??
                'No training yet'}
            </ThemedText>
          </View>

          <View
            style={{
              height: 8,
              backgroundColor:
                'rgba(255,255,255,0.25)',
              borderRadius: 999,
            }}
          >
            <View
              style={{
                width: '60%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 999,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#2A2A2A',
            }}
          >
            <ThemedText
              style={{
                opacity: 0.7,
              }}
            >
              Sessions
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 24,
                fontWeight: '700',
                marginTop: 8,
              }}
            >
              {dashboard.completedSessions}
            </ThemedText>
          </View>

          <View
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#2A2A2A',
            }}
          >
            <ThemedText
              style={{
                opacity: 0.7,
              }}
            >
              Next Training
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginTop: 8,
              }}
            >
              {dashboard.nextTrainingPlan ?? '-'}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}