import { View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from './themed-text';

type AppHeaderProps = {
  title: string;
};

export default function AppHeader({
  title,
}: AppHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      <SymbolView
        name="person.crop.circle.fill"
        size={40}
        tintColor="#111111"
      />

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

      <SymbolView
        name="ellipsis.circle.fill"
        size={40}
        tintColor="#111111"
      />
    </View>
  );
}