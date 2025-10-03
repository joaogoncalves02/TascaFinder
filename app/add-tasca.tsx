import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Location from 'expo-location';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { spacing } from '@/theme/spacing';
import { colors } from '@/theme/colors';
import { useAppStore } from '@/store/useAppStore';
import { addTasca } from '@/lib/repositories/tascasRepo';
import { v4 as uuidv4 } from 'uuid';

const boolFields = [
  { name: 'has_menu_of_day', label: 'Menu do dia', emoji: '🍽️' },
  { name: 'accepts_cards', label: 'Aceita MB', emoji: '💳' },
  { name: 'veg_options', label: 'Opções vegetarianas', emoji: '🥦' },
  { name: 'gluten_free', label: 'Opções sem glúten', emoji: '🌾' },
] as const;

type BoolFieldName = (typeof boolFields)[number]['name'];

const scheduleTextExample = `mon:12:00-15:00,19:00-22:00\ntue:12:00-15:00,19:00-22:00\nwed:12:00-15:00,19:00-22:00\nthu:12:00-15:00,19:00-22:00\nfri:12:00-15:00,19:00-23:00\nsat:12:30-16:00,19:00-23:00\nsun:`;

const formSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  price_level: z.coerce.number().int().min(1).max(3),
  has_menu_of_day: z.boolean(),
  accepts_cards: z.boolean(),
  veg_options: z.boolean(),
  gluten_free: z.boolean(),
  tags_csv: z.string().optional().default(''),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().or(z.literal('')).nullable(),
  menu_url: z.string().url().optional().or(z.literal('')).nullable(),
  schedule_text: z.string().min(0),
});

type FormValues = z.infer<typeof formSchema>;

const parseScheduleText = (input: string) => {
  const schedule: Record<string, [string, string][]> = {};
  input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [day, ranges] = line.split(':');
      if (!day) return;
      const normalizedDay = day.slice(0, 3).toLowerCase();
      schedule[normalizedDay] = (ranges ?? '')
        .split(',')
        .map((range) => range.trim())
        .filter(Boolean)
        .map((range) => {
          const [start, end] = range.split('-').map((value) => value.trim());
          if (!start || !end) {
            return null;
          }
          return [start, end] as [string, string];
        })
        .filter((slot): slot is [string, string] => Array.isArray(slot));
    });
  return schedule;
};

export default function AddTascaScreen() {
  const { location, setLocation, setPermissionStatus } = useAppStore();
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      lat: location.coords?.lat ?? 0,
      lng: location.coords?.lng ?? 0,
      price_level: 1,
      has_menu_of_day: true,
      accepts_cards: true,
      veg_options: false,
      gluten_free: false,
      tags_csv: '',
      phone: '',
      website: '',
      menu_url: '',
      schedule_text: scheduleTextExample,
    },
  });

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Não foi possível obter localização.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    const coords = { lat: loc.coords.latitude, lng: loc.coords.longitude };
    setLocation(coords);
    setValue('lat', coords.lat);
    setValue('lng', coords.lng);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    const schedule = parseScheduleText(values.schedule_text || scheduleTextExample);
    await addTasca({
      id: uuidv4(),
      name: values.name,
      address: values.address,
      city: values.city,
      lat: values.lat,
      lng: values.lng,
      price_level: values.price_level,
      has_menu_of_day: values.has_menu_of_day ? 1 : 0,
      accepts_cards: values.accepts_cards ? 1 : 0,
      veg_options: values.veg_options ? 1 : 0,
      gluten_free: values.gluten_free ? 1 : 0,
      tags_csv: values.tags_csv ?? '',
      phone: values.phone || null,
      website: values.website || null,
      menu_url: values.menu_url || null,
      schedule_json: JSON.stringify(schedule),
      pending_sync: 1,
    });
    setSubmitting(false);
    Alert.alert('Obrigado!', 'Tasca adicionada 👏');
    router.replace('/');
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Adiciona uma tasca autêntica</Text>
      <View style={styles.card}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="Ex.: Tasca do Zé" />
            </View>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Morada</Text>
              <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="Rua..." />
            </View>
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="Lisboa" />
            </View>
          )}
        />
        <View style={styles.inlineFields}>
          <Controller
            control={control}
            name="lat"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inlineField}>
                <Text style={styles.label}>Latitude</Text>
                <TextInput style={styles.input} value={String(value)} onChangeText={onChange} keyboardType="decimal-pad" />
              </View>
            )}
          />
          <Controller
            control={control}
            name="lng"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inlineField}>
                <Text style={styles.label}>Longitude</Text>
                <TextInput style={styles.input} value={String(value)} onChangeText={onChange} keyboardType="decimal-pad" />
              </View>
            )}
          />
        </View>
        <Pressable style={styles.secondaryButton} onPress={requestLocation}>
          <Text style={styles.secondaryButtonText}>📍 Usar minha localização</Text>
        </Pressable>
        <Text style={[styles.label, styles.priceLabel]}>Nível de preço</Text>
        <Controller
          control={control}
          name="price_level"
          render={({ field: { value, onChange } }) => (
            <View style={styles.priceRow}>
              {[1, 2, 3].map((level) => (
                <Pressable
                  key={level}
                  onPress={() => onChange(level)}
                  style={[styles.priceChip, value === level && styles.priceChipActive]}
                >
                  <Text style={[styles.priceChipText, value === level && styles.priceChipTextActive]}>
                    {'€'.repeat(level)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {boolFields.map((field) => (
          <Controller
            key={field.name}
            control={control}
            name={field.name as BoolFieldName}
            render={({ field: { value, onChange } }) => (
              <Pressable onPress={() => onChange(!value)} style={[styles.boolChip, value && styles.boolChipActive]}>
                <Text style={[styles.boolChipText, value && styles.boolChipTextActive]}>{`${field.emoji} ${field.label}`}</Text>
              </Pressable>
            )}
          />
        ))}
        <Controller
          control={control}
          name="tags_csv"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Tags (separadas por vírgula)</Text>
              <TextInput
                style={styles.input}
                value={value ?? ''}
                onChangeText={onChange}
                placeholder="bacalhau, petiscos, caldo verde"
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Contacto telefónico</Text>
              <TextInput style={styles.input} value={value ?? ''} onChangeText={onChange} keyboardType="phone-pad" />
            </View>
          )}
        />
        <Controller
          control={control}
          name="website"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Website</Text>
              <TextInput style={styles.input} value={value ?? ''} onChangeText={onChange} placeholder="https://" />
            </View>
          )}
        />
        <Controller
          control={control}
          name="menu_url"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Menu online (opcional)</Text>
              <TextInput style={styles.input} value={value ?? ''} onChangeText={onChange} placeholder="https://" />
            </View>
          )}
        />
        <Controller
          control={control}
          name="schedule_text"
          render={({ field: { value, onChange } }) => (
            <View style={styles.field}>
              <Text style={styles.label}>Horário por dia (formato mon:12:00-15:00)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={6}
              />
            </View>
          )}
        />
        <Pressable
          style={[styles.primaryButton, submitting && styles.disabledButton]}
          onPress={onSubmit}
          disabled={submitting}
        >
          <Text style={styles.primaryButtonText}>{submitting ? 'A guardar...' : 'Guardar Tasca'}</Text>
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
    fontSize: 22,
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
  inlineFields: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  inlineField: {
    flex: 1,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.branco,
    marginBottom: spacing.lg,
  },
  secondaryButtonText: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  priceLabel: {
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  priceChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  priceChipActive: {
    backgroundColor: colors.azulejo,
  },
  priceChipText: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  priceChipTextActive: {
    color: colors.branco,
  },
  boolChip: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.branco,
  },
  boolChipActive: {
    backgroundColor: colors.azulejo,
  },
  boolChipText: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  boolChipTextActive: {
    color: colors.branco,
  },
  textArea: {
    height: 140,
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
});
