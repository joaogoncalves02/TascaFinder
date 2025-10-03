import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { formatDistance, formatPriceLevel, formatScore } from '@/utils/format';
import { Chip } from './Chip';

interface TascaCardProps {
  name: string;
  city: string;
  address: string;
  score: number;
  comida: number;
  ambiente: number;
  preco_justo: number;
  price_level: number;
  tags_csv: string;
  distanceKm?: number;
  onPress?: () => void;
  footer?: ReactNode;
}

export const TascaCard = ({
  name,
  city,
  address,
  score,
  comida,
  ambiente,
  preco_justo,
  price_level,
  tags_csv,
  distanceKm,
  onPress,
  footer,
}: TascaCardProps) => {
  const tags = tags_csv.split(',').map((tag) => tag.trim()).filter(Boolean);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes da tasca ${name}`}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{`🍽️ ${name}`}</Text>
        <Text style={styles.city}>{`${city} • ${address}`}</Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreBadge}>{`⭐ ${formatScore(score)}`}</Text>
        <Text style={styles.scoreDetail}>{`Comida ${comida.toFixed(1)} • Ambiente ${ambiente.toFixed(1)} • Preço ${preco_justo.toFixed(1)}`}</Text>
      </View>
      <View style={styles.metaRow}>
        <Chip label={formatPriceLevel(price_level as 1 | 2 | 3)} icon="💶" />
        {distanceKm !== undefined ? (
          <Chip label={formatDistance(distanceKm)} icon="🧭" />
        ) : null}
      </View>
      <View style={styles.tagsRow}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} icon="🥘" />
        ))}
      </View>
      {footer}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.bege,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
  },
  header: {
    marginBottom: spacing.sm,
  },
  name: {
    color: colors.azulejo,
    fontSize: 20,
    fontWeight: '700',
  },
  city: {
    color: colors.cinzaMedio,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  scoreRow: {
    marginBottom: spacing.sm,
  },
  scoreBadge: {
    color: colors.azulejo,
    fontWeight: '700',
    fontSize: 16,
  },
  scoreDetail: {
    color: colors.cinzaMedio,
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
