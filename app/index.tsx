import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { listTascas, TascaWithScore } from '@/lib/repositories/tascasRepo';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { TileHeader } from '@/components/TileHeader';
import { TascaCard } from '@/components/TascaCard';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { AdPlaceholder } from '@/components/AdPlaceholder';

const quickFilters = [
  { key: 'barato', label: '€ Barato', icon: '💶' },
  { key: 'menu', label: 'Menu do Dia', icon: '🍽️' },
  { key: 'petiscos', label: 'Petiscos', icon: '🥘' },
  { key: 'comidaCaseira', label: 'Comida Caseira', icon: '🍲' },
  { key: 'abertoAgora', label: 'Aberto Agora', icon: '🕰️' },
] as const;

export default function HomeScreen() {
  const { filters, toggleFilter, query, setQuery, location, setLocation, setPermissionStatus } =
    useAppStore();
  const [loading, setLoading] = useState(true);
  const [tascas, setTascas] = useState<TascaWithScore[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTascas = async () => {
    setLoading(true);
    const items = await listTascas({
      query,
      filters,
      location: location.coords,
    });
    setTascas(items);
    setLoading(false);
  };

  useEffect(() => {
    loadTascas();
  }, [filters, query, location.coords]);

  const handleUseLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da tua localização para ordenar por distância.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTascas();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: TascaWithScore }) => (
    <TascaCard
      {...item}
      onPress={() => router.push({ pathname: '/tasca/[id]', params: { id: item.id } })}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={tascas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TileHeader title="TascaFinder" subtitle="O guia de tascas portuguesas 🍽️" />
            <View style={styles.controls}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="🔎 Pesquisa por nome, bairro ou cidade"
                placeholderTextColor={colors.cinzaMedio}
                style={styles.search}
                accessibilityLabel="Campo de pesquisa"
              />
              <Pressable style={styles.locationButton} onPress={handleUseLocation}>
                <Text style={styles.locationButtonText}>📍 Usar minha localização</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
              {quickFilters.map((filter) => (
                <Chip
                  key={filter.key}
                  label={filter.label}
                  icon={filter.icon}
                  active={filters[filter.key]}
                  onPress={() => toggleFilter(filter.key)}
                />
              ))}
            </ScrollView>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push('/add-tasca')}
              accessibilityLabel="Adicionar nova tasca"
            >
              <Text style={styles.secondaryButtonText}>➕ Adicionar Tasca</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push('/roteiros')}
              accessibilityLabel="Abrir roteiros turísticos"
            >
              <Text style={styles.secondaryButtonText}>🇵🇹 Ver Roteiros</Text>
            </Pressable>
            <AdPlaceholder />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={colors.azulejo} />
          ) : (
            <EmptyState title="Sem tascas" description="Experimenta ajustar filtros ou adicionar uma nova tasca." />
          )
        }
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bege,
  },
  headerContainer: {
    padding: spacing.lg,
    backgroundColor: colors.bege,
  },
  controls: {
    marginTop: spacing.lg,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.azulejo,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.azulejo,
  },
  locationButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.azulejo,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  locationButtonText: {
    color: colors.branco,
    fontWeight: '700',
  },
  filtersRow: {
    marginTop: spacing.lg,
  },
  secondaryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.azulejo,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.branco,
  },
  secondaryButtonText: {
    color: colors.azulejo,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
