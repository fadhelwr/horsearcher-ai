import { useCallback, useState } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { api } from '../../../services/api';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function HistoryScreen() {
  const [sessions, setSessions] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const response = await api.get(
        '/training-sessions'
      );

      setSessions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
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
            Progress
          </ThemedText>

          <ThemedText
            style={{
                fontSize: 14,
                opacity: 0.6,
            }}
            >
            Your Progress
            </ThemedText>

          {sessions.map((session) => (
            <View
              key={session.sessionId}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: 16,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
                  {session.trainingPlanTitle}
                </ThemedText>

                <ThemedText
                  style={{
                    color: '#22C55E',
                    fontWeight: '700',
                  }}
                >
                  +{session.xpGained} XP
                </ThemedText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                }}
              >
                <ThemedText
                style={{
                    opacity: 0.5,
                    fontSize: 12,
                    marginBottom: 10,
                }}
                >
                {new Date(
                    session.createdAt
                ).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
                </ThemedText>

                <ThemedText
                  style={{
                    opacity: 0.6,
                  }}
                >
                  ⏱ {session.durationMinutes} min
                </ThemedText>

                <ThemedText
                  style={{
                    opacity: 0.6,
                  }}
                >
                  ⭐ {session.rating}/10
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}