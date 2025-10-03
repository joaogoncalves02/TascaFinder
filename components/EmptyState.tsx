import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface EmptyStateProps {
  title: string;
  description?: string;
  emoji?: string;
}

export const EmptyState = ({ title, description, emoji = '🧭' }: EmptyStateProps) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.azulejo,
    marginTop: spacing.sm,
  },
  description: {
    textAlign: 'center',
    marginTop: spacing.xs,
    color: colors.cinzaMedio,
  },
});
