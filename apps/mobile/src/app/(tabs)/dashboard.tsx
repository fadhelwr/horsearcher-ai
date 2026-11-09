import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { api } from '../../../services/api';

import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import AppHeader from '../../components/app-header';

export default function DashboardScreen() {
  const [dashboard, setDashboard] =
    useState<any>(null);

  const [lastTraining, setLastTraining] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const dashboardResponse =
        await api.get('/dashboard');

      setDashboard(
        dashboardResponse.data
      );

      const trainingResponse =
        await api.get(
          '/training-sessions'
        );

      if (
        trainingResponse.data.length > 0
      ) {
        setLastTraining(
          trainingResponse.data[0]
        );
      }
    } catch (error: any) {
      console.log(
        'DASHBOARD ERROR:',
        error?.response?.data
      );

      console.log(
        'STATUS:',
        error?.response?.status
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const progress = dashboard
    ? ((dashboard.xp ?? 0) % 500) / 500
    : 0;

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
          title="Dashboard"
        />

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {loading && !dashboard ? (
            <View
              style={{
                paddingTop: 80,
                alignItems: 'center',
              }}
            >
              <ActivityIndicator
                size="large"
                color="#111111"
              />
            </View>
          ) : !dashboard ? (
            <View
              style={{
                paddingTop: 80,
                alignItems: 'center',
              }}
            >
              <ThemedText>
                Failed to load dashboard
              </ThemedText>
            </View>
          ) : (
            <>
              {/* HERO CARD */}

              <View
                style={{
                  backgroundColor:
                    '#111111',
                  borderRadius: 30,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <ThemedText
                  style={{
                    color: '#AAAAAA',
                  }}
                >
                  Your latest training
                  session
                </ThemedText>

                <ThemedText
                  style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    fontWeight: '700',
                    marginTop: 10,
                  }}
                >
                  {lastTraining
                    ?.trainingPlanTitle ??
                    'Ready to Train'}
                </ThemedText>

                <View
                  style={{
                    marginTop: 5,
                    marginBottom: 18,
                  }}
                >
                  <ThemedText
                    style={{
                      color: '#FFFFFF',
                      opacity: 0.8,
                      marginTop: 8,
                    }}
                  >
                    Level{' '}
                    {dashboard?.level ??
                      0}{' '}
                    •{' '}
                    {dashboard?.xp ?? 0}
                    XP
                  </ThemedText>
                </View>

                <View
                  style={{
                    height: 8,
                    backgroundColor:
                      'rgba(255,255,255,0.2)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{
                      width: `${
                        progress * 100
                      }%`,
                      height: '100%',
                      backgroundColor:
                        '#FFFFFF',
                    }}
                  />
                </View>
              </View>

              {/* STATS */}

              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      '#FFFFFF',
                    borderRadius: 24,
                    padding: 20,
                  }}
                >
                  <ThemedText
                    style={{
                      opacity: 0.6,
                    }}
                  >
                    Sessions
                  </ThemedText>

                  <ThemedText
                    style={{
                      fontSize: 25,
                      fontWeight:
                        '700',
                      marginTop: 8,
                    }}
                  >
                    {
                      dashboard?.completedSessions ??
                      0
                    }
                  </ThemedText>
                </View>

                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      '#FFFFFF',
                    borderRadius: 24,
                    padding: 20,
                  }}
                >
                  <ThemedText
                    style={{
                      opacity: 0.6,
                    }}
                  >
                    Level
                  </ThemedText>

                  <ThemedText
                    style={{
                      fontSize: 25,
                      fontWeight:
                        '700',
                      marginTop: 8,
                    }}
                  >
                    {dashboard?.level ??
                      0}
                  </ThemedText>
                </View>
              </View>

              {/* NEXT TRAINING */}

              <View
                style={{
                  backgroundColor:
                    '#FFFFFF',
                  borderRadius: 24,
                  padding: 20,
                }}
              >
                <ThemedText
                  style={{
                    opacity: 0.6,
                  }}
                >
                  Next Training Plan
                </ThemedText>

                <ThemedText
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    marginTop: 8,
                  }}
                >
                  -
                </ThemedText>
              </View>
            </>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}