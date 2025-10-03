import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.azulejo} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.azulejo },
          headerTintColor: colors.branco,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tasca/[id]" options={{ title: 'Detalhes da Tasca' }} />
        <Stack.Screen name="add-tasca" options={{ title: 'Adicionar Tasca' }} />
        <Stack.Screen name="add-review" options={{ title: 'Nova Review' }} />
        <Stack.Screen name="roteiros/index" options={{ title: 'Roteiros 🇵🇹' }} />
        <Stack.Screen name="perfil/index" options={{ title: 'Perfil & Sobre' }} />
      </Stack>
    </>
  );
}
