import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { reviewSchema } from '@/utils/validate';
import { v4 as uuidv4 } from 'uuid';
import { addReview } from '@/lib/repositories/reviewsRepo';

const ratingFields = [
  { name: 'comida', label: 'Comida', emoji: '🍲' },
  { name: 'ambiente', label: 'Ambiente', emoji: '🎶' },
  { name: 'preco_justo', label: 'Preço justo', emoji: '💶' },
] as const;

type FormValues = {
  tasca_id: string;
  user_nick: string;
  comida: number;
  ambiente: number;
  preco_justo: number;
  comment: string;
};

const ScoreSelector = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <View style={styles.scoreSelector}>
    <Pressable
      accessibilityLabel="Diminuir pontuação"
      style={styles.scoreButton}
      onPress={() => onChange(Math.max(0, value - 0.5))}
    >
      <Text style={styles.scoreButtonText}>➖</Text>
    </Pressable>
    <Text style={styles.scoreValue}>{value.toFixed(1)}</Text>
    <Pressable
      accessibilityLabel="Aumentar pontuação"
      style={styles.scoreButton}
      onPress={() => onChange(Math.min(5, value + 0.5))}
    >
      <Text style={styles.scoreButtonText}>➕</Text>
    </Pressable>
  </View>
);

export default function AddReviewScreen() {
  const params = useLocalSearchParams<{ tascaId: string; name?: string }>();
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      tasca_id: params.tascaId ?? '',
      user_nick: '',
      comida: 3,
      ambiente: 3,
      preco_justo: 3,
      comment: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!params.tascaId) {
      Alert.alert('Erro', 'Tasca inválida.');
      return;
    }
    setSubmitting(true);
    await addReview({
      id: uuidv4(),
      tasca_id: params.tascaId,
      user_nick: values.user_nick,
      comida: values.comida,
      ambiente: values.ambiente,
      preco_justo: values.preco_justo,
      comment: values.comment ?? '',
      created_at: new Date().toISOString(),
      pending_sync: 1,
    });
    setSubmitting(false);
    Alert.alert('Obrigado!', 'Review registada com sucesso.');
    router.back();
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`✍️ Escrever review para ${params.name ?? 'tasca'}`}</Text>
      <View style={styles.card}>
        <Controller
          control={control}
          name="user_nick"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>O teu nome (ou alcunha)</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Ex.: Tasqueiro Alegre"
                style={styles.input}
                maxLength={40}
              />
            </View>
          )}
        />
        {ratingFields.map((field) => (
          <Controller
            key={field.name}
            control={control}
            name={field.name}
            render={({ field: { value, onChange } }) => (
              <View style={styles.field}>
                <Text style={styles.label}>{`${field.emoji} ${field.label}`}</Text>
                <ScoreSelector value={value} onChange={onChange} />
              </View>
            )}
          />
        ))}
        <Controller
          control={control}
          name="comment"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Comentário (opcional)</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Até 280 caracteres"
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
                maxLength={280}
              />
            </View>
          )}
        />
        <Pressable
          style={[styles.primaryButton, submitting && styles.disabledButton]}
          onPress={onSubmit}
          disabled={submitting}
        >
          <Text style={styles.primaryButtonText}>{submitting ? 'A guardar...' : 'Guardar review'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.bege,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.azulejo,
    marginBottom: spacing.lg,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontWeight: '700',
    marginBottom: spacing.xs,
    color: colors.azulejo,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.branco,
    color: colors.azulejo,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.branco,
    fontWeight: '700',
  },
  scoreSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  scoreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.azulejo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreButtonText: {
    color: colors.branco,
    fontSize: 18,
    fontWeight: '700',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.azulejo,
  },
});
