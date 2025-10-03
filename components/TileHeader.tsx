import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface TileHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
}

export const TileHeader = ({ title, subtitle, rightContent }: TileHeaderProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.azulejo, '#17497D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </LinearGradient>
      {rightContent ? <View style={styles.right}>{rightContent}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  title: {
    color: colors.branco,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.bege,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  right: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
});
