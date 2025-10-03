import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const AdPlaceholder = () => {
  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={styles.text}>Espaço de Anúncio — 🍷 Divulga a tua tasca aqui</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.vinho,
    borderRadius: 12,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    backgroundColor: colors.branco,
  },
  text: {
    color: colors.vinho,
    fontWeight: '700',
    textAlign: 'center',
  },
});
