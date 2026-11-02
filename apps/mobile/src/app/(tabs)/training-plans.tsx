import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  router,
  useFocusEffect,
} from 'expo-router';

import { api } from '../../../services/api';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function TrainingPlansScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPlans = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        '/training-plans'
      );

      setPlans(response.data);
    } catch (error: any) {
        console.log('LOAD PLANS ERROR');
        console.log(error);
        console.log(error?.response);
        console.log(error?.response?.data);

        Alert.alert(
          'Error',
          JSON.stringify(
            error?.response?.data ?? error.message
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
          notes: 'Completed from mobile app',
        }
      );

      Alert.alert(
        'Training Complete',
        `+${response.data.xpGained} XP`
      );

      router.replace('/dashboard');
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Error',
        error?.response?.data?.message ??
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
      }}
    >
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText
            style={{
              fontSize: 14,
              opacity: 0.6,
            }}
          >
            Training
          </ThemedText>

          <ThemedText
            type="title"
            style={{
              marginBottom: 24,
            }}
          >
            Training Plans
          </ThemedText>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#2563EB"
            />
          ) : plans.length === 0 ? (
            <ThemedText>
              No training plans found
            </ThemedText>
          ) : (
            plans.map((plan) => (
              <Pressable
                key={plan.id}
                onPress={() =>
                  completeTraining(plan.id)
                }
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    padding: 18,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <ThemedText
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        flex: 1,
                      }}
                    >
                      {plan.title ?? plan.name}
                    </ThemedText>

                    <ThemedText
                      style={{
                        color: '#22C55E',
                        fontWeight: '700',
                      }}
                    >
                      +{plan.xpReward} XP
                    </ThemedText>
                  </View>

                  <ThemedText
                    style={{
                      opacity: 0.6,
                    }}
                  >
                    Tap to complete training
                  </ThemedText>
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}