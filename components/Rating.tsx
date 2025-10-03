import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface RatingProps {
  label: string;
  value: number;
}

export const Rating = ({ label, value }: RatingProps) => {
  const stars = Math.round(value);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} accessibilityLabel={`${label} ${value.toFixed(1)} em 5`}>
        {'⭐'.repeat(stars)} {value.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  label: {
    color: colors.cinzaMedio,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    color: colors.azulejo,
    fontWeight: '700',
    fontSize: 16,
  },
});
