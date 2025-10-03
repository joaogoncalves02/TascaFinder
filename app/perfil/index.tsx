import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { AdPlaceholder } from '@/components/AdPlaceholder';

const NICKNAME_KEY = 'tasca_nickname';

export default function PerfilScreen() {
  const [nick, setNick] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored = await SecureStore.getItemAsync(NICKNAME_KEY);
      if (stored) {
        setNick(stored);
      }
      setLoading(false);
    };
    load();
  }, []);

  const saveNick = async () => {
    await SecureStore.setItemAsync(NICKNAME_KEY, nick);
    Alert.alert('Guardado', 'Perfil atualizado com sucesso.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>👤 O teu perfil offline</Text>
        <Text style={styles.description}>
          Guarda um nickname para assinares reviews e sugestões mesmo sem ligação à internet.
        </Text>
        <TextInput
          value={nick}
          onChangeText={setNick}
          style={styles.input}
          placeholder="Ex.: Tasqueiro Alegre"
        />
        <Pressable style={styles.primaryButton} onPress={saveNick} disabled={loading}>
          <Text style={styles.primaryButtonText}>💾 Guardar</Text>
        </Pressable>
      </View>
      <AdPlaceholder />
      <View style={styles.card}>
        <Text style={styles.title}>ℹ️ Sobre o TascaFinder</Text>
        <Text style={styles.paragraph}>
          TascaFinder é um guia independente dedicado a preservar e divulgar as tascas portuguesas clássicas. É um projeto
          offline-first, pensado para funcionar em viagem e em locais com rede limitada.
        </Text>
        <Text style={styles.subtitle}>Como classificamos</Text>
        <Text style={styles.paragraph}>
          Cada tasca recebe notas de 0 a 5 em três dimensões: Comida (50%), Ambiente (30%) e Preço Justo (20%). A média
          ponderada cria o score principal. Reviews novas recalculam automaticamente estas métricas.
        </Text>
        <Text style={styles.subtitle}>Sugere uma tasca</Text>
        <Text style={styles.paragraph}>
          Se conheces uma tasca que merece destaque, adiciona-a através do formulário "Adicionar Tasca". Fica marcada como
          pendente de sincronização até existir ligação a um backend.
        </Text>
        <Text style={styles.subtitle}>Contacta-nos</Text>
        <Text style={styles.paragraph}>
          Envia um email para ola@tascafinder.pt com sugestões, correções ou parcerias. Adoramos ouvir histórias de tascas!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.bege,
    gap: spacing.lg,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.azulejo,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.azulejo,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.cinzaTexto,
    marginBottom: spacing.md,
  },
  paragraph: {
    color: colors.cinzaTexto,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.branco,
    color: colors.azulejo,
  },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.branco,
    fontWeight: '700',
  },
});
