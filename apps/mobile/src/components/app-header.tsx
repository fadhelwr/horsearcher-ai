import { Pressable, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { ThemedText } from './themed-text';
import { router } from 'expo-router';

type AppHeaderProps = {
  title: string;
};

export default function AppHeader({
  title,
}: AppHeaderProps) {
    const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  const handleMenuPress = () => {
    console.log('Menu');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      <Pressable
        onPress={handleProfilePress}
        hitSlop={12}
      >
        <SymbolView
          name="person.crop.circle"
          size={40}
          tintColor="#111111"
        />
      </Pressable>

      <View
        style={{
          backgroundColor: '#111111',
          paddingHorizontal: 24,
          paddingVertical: 8,
          borderRadius: 999,
        }}
      >
        <ThemedText
          style={{
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1,
          }}
        >
          {title.toUpperCase()}
        </ThemedText>
      </View>

      <Pressable
        onPress={handleMenuPress}
        hitSlop={12}
      >
        <View
          style={{
            width: 22,
            height: 18,
            justifyContent:
              'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              width: 24,
              height: 3,
              borderRadius: 999,
              backgroundColor:
                '#111111',
            }}
          />

          <View
            style={{
              width: 18,
              height: 3,
              borderRadius: 999,
              backgroundColor:
                '#111111',
            }}
          />

          <View
            style={{
              width: 14,
              height: 3,
              borderRadius: 999,
              backgroundColor:
                '#111111',
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}
