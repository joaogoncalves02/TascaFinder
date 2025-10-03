import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface ChipProps {
  label: string;
  icon?: string;
  active?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const Chip = ({ label, icon, active = false, onPress, accessibilityLabel }: ChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.container,
        active && styles.active,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{`${icon ? `${icon} ` : ''}${label}`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.bege,
    minHeight: 44,
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.azulejo,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: colors.azulejo,
    fontWeight: '600',
  },
  textActive: {
    color: colors.branco,
  },
});
