import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { getTascaById } from '@/lib/repositories/tascasRepo';
import { useAppStore } from '@/store/useAppStore';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Chip } from '@/components/Chip';
import { Rating } from '@/components/Rating';
import { EmptyState } from '@/components/EmptyState';
import { formatPriceLevel } from '@/utils/format';
import { openInMaps } from '@/lib/geo';
import { formatScheduleRange, todaysSchedule } from '@/lib/schedule';

const flags = [
  { key: 'has_menu_of_day', label: 'Menu do dia', emoji: '🍲' },
  { key: 'accepts_cards', label: 'Aceita MB', emoji: '💳' },
  { key: 'veg_options', label: 'Vegetariano', emoji: '🥦' },
  { key: 'gluten_free', label: 'Gluten-free', emoji: '🌾' },
] as const;

export default function TascaDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const { location } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [tasca, setTasca] = useState<any | null>(null);

  useEffect(() => {
    if (!params.id) return;
    const fetchData = async () => {
      setLoading(true);
      const result = await getTascaById(params.id, location.coords);
      setTasca(result);
      setLoading(false);
    };
    fetchData();
  }, [params.id, location.coords]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.azulejo} />
      </View>
    );
  }

  if (!tasca) {
    return <EmptyState title="Tasca não encontrada" description="Volta atrás e escolhe outra tasca." emoji="❌" />;
  }

  const schedule = JSON.parse(tasca.schedule_json);
  const todayRange = todaysSchedule(schedule);

  const handleCall = () => {
    if (!tasca.phone) {
      Alert.alert('Sem contacto', 'Esta tasca ainda não tem número associado.');
      return;
    }
    Linking.openURL(`tel:${tasca.phone}`);
  };

  const handleOpenWebsite = (url?: string | null) => {
    if (!url) {
      Alert.alert('Sem site', 'Ainda não temos website associado.');
      return;
    }
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{`🥘 ${tasca.name}`}</Text>
        <Text style={styles.subtitle}>{`${tasca.address}, ${tasca.city}`}</Text>
        <View style={styles.metrics}>
          <Rating label="Score" value={tasca.score} />
          <Rating label="Comida" value={tasca.comida} />
          <Rating label="Ambiente" value={tasca.ambiente} />
          <Rating label="Preço" value={tasca.preco_justo} />
        </View>
        <Text style={styles.sectionTitle}>Informação</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Endereço</Text>
          <Text style={styles.infoValue}>{tasca.address}</Text>
          <Pressable style={styles.infoButton} onPress={() => openInMaps(tasca.lat, tasca.lng, tasca.name)}>
            <Text style={styles.infoButtonText}>🧭 Abrir no mapa</Text>
          </Pressable>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contacto</Text>
          <Text style={styles.infoValue}>{tasca.phone ?? '—'}</Text>
          <Pressable style={styles.infoButton} onPress={handleCall}>
            <Text style={styles.infoButtonText}>📞 Ligar</Text>
          </Pressable>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Website</Text>
          <Text style={styles.infoValue}>{tasca.website ?? '—'}</Text>
          <Pressable style={styles.infoButton} onPress={() => handleOpenWebsite(tasca.website)}>
            <Text style={styles.infoButtonText}>🌐 Abrir site</Text>
          </Pressable>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Menu online</Text>
          <Text style={styles.infoValue}>{tasca.menu_url ?? '—'}</Text>
          <Pressable style={styles.infoButton} onPress={() => handleOpenWebsite(tasca.menu_url)}>
            <Text style={styles.infoButtonText}>📜 Ver menu</Text>
          </Pressable>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Preço</Text>
          <Text style={styles.infoValue}>{formatPriceLevel(tasca.price_level as 1 | 2 | 3)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Horário hoje</Text>
          <Text style={styles.infoValue}>
            {todayRange.length > 0 ? formatScheduleRange(todayRange) : 'Fechado'}
          </Text>
        </View>
        <View style={styles.flagRow}>
          {flags.map((flag) =>
            tasca[flag.key] ? (
              <Chip key={flag.key} label={flag.label} icon={flag.emoji} />
            ) : null
          )}
        </View>
        <Text style={styles.sectionTitle}>Especialidades</Text>
        <View style={styles.tagsRow}>
          {tasca.tags_csv
            .split(',')
            .map((tag: string) => tag.trim())
            .filter(Boolean)
            .map((tag: string) => (
              <Chip key={tag} label={tag} icon="🍷" />
            ))}
        </View>
        <Pressable
          style={styles.primaryButton}
          onPress={() =>
            router.push({ pathname: '/add-review', params: { tascaId: tasca.id, name: tasca.name } })
          }
        >
          <Text style={styles.primaryButtonText}>✍️ Escrever review</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => Alert.alert('Sugestão enviada', 'Obrigado pela tua sugestão!')}
        >
          <Text style={styles.secondaryButtonText}>🛠️ Sugerir correção</Text>
        </Pressable>
      </View>

      <AdPlaceholder />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reviews ({tasca.reviews.length})</Text>
        {tasca.reviews.length === 0 ? (
          <EmptyState title="Sem reviews" description="Sê o primeiro a partilhar a tua experiência." emoji="📝" />
        ) : (
          tasca.reviews.map((review: any) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewHeader}>{`${review.user_nick} • ${new Date(
                review.created_at
              ).toLocaleDateString()}`}</Text>
              <Text style={styles.reviewScores}>{`Comida ${review.comida.toFixed(1)} ⭐  Ambiente ${review.ambiente.toFixed(
                1
              )} ⭐  Preço ${review.preco_justo.toFixed(1)} ⭐`}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.bege,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.azulejo,
  },
  subtitle: {
    color: colors.cinzaMedio,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.azulejo,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  infoRow: {
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontWeight: '700',
    color: colors.azulejo,
  },
  infoValue: {
    color: colors.cinzaTexto,
    marginTop: spacing.xs,
  },
  infoButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  infoButtonText: {
    color: colors.branco,
    fontWeight: '700',
  },
  flagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  primaryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.branco,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  secondaryButtonText: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  reviewCard: {
    borderTopWidth: 1,
    borderTopColor: colors.cinzaClaro,
    paddingVertical: spacing.md,
  },
  reviewHeader: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  reviewScores: {
    color: colors.cinzaMedio,
    marginTop: spacing.xs,
  },
  reviewComment: {
    color: colors.cinzaTexto,
    marginTop: spacing.xs,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
