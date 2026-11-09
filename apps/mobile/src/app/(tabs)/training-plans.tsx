import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import {
  router,
  useFocusEffect,
} from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '../../../services/api';

import AppHeader from '../../components/app-header';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function TrainingPlansScreen() {
  const [plans, setPlans] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const loadPlans = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        '/training-plans'
      );

      setPlans(response.data);
    } catch (error: any) {
      console.log(
        'LOAD PLANS ERROR'
      );

      console.log(error);

      Alert.alert(
        'Error',
        JSON.stringify(
          error?.response?.data ??
            error.message
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const completeTraining = async (
    trainingPlanId: string,
  ) => {
    try {
      const response = await api.post(
        '/training-sessions',
        {
          trainingPlanId,
          durationMinutes: 30,
          rating: 8,
          notes:
            'Completed from mobile app',
        }
      );

      Alert.alert(
        'Training Complete',
        `+${response.data.xpGained} XP`
      );

      router.replace(
        '/dashboard'
      );
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Error',
        error?.response?.data
          ?.message ??
          'Failed to complete training'
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPlans();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
      }}
    >
      <ThemedView
        style={{
          flex: 1,
          backgroundColor: '#F8F8F8',
          paddingHorizontal: 24,
          paddingTop: 12,
        }}
      >
        <AppHeader
          title="Training Plans"
        />

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#111111"
            />
          ) : plans.length === 0 ? (
            <ThemedText>
              No training plans found
            </ThemedText>
          ) : (
            plans.map((plan) => (
              <View
                key={plan.id}
                style={{
                  backgroundColor:
                    '#FFFFFF',
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 16,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginBottom: 8,
                  }}
                >
                  {plan.title ??
                    plan.name}
                </ThemedText>

                <ThemedText
                  style={{
                    opacity: 0.6,
                    marginBottom: 20,
                  }}
                >
                  Complete this
                  training session to
                  earn XP and improve
                  your horseback
                  archery skills.
                </ThemedText>

                <View
                  style={{
                    flexDirection:
                      'row',
                    alignItems:
                      'center',
                    justifyContent:
                      'space-between',
                  }}
                >
                  <ThemedText
                    style={{
                      fontWeight:
                        '700',
                      color:
                        '#22C55E',
                      fontSize: 16,
                    }}
                  >
                    +
                    {plan.xpReward}{' '}
                    XP
                  </ThemedText>

                  <Pressable
                    onPress={() =>
                      completeTraining(
                        plan.id
                      )
                    }
                    style={{
                      backgroundColor:
                        '#111111',
                      borderRadius: 14,
                      paddingHorizontal: 18,
                      paddingVertical: 10,
                    }}
                  >
                    <ThemedText
                      style={{
                        color:
                          '#FFFFFF',
                        fontWeight:
                          '700',
                      }}
                    >
                      Start
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}