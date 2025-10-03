import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Chip } from '@/components/Chip';

const itineraries = [
  {
    title: 'Lisboa em 24h (Baixa/Mouraria/Alfama)',
    emoji: '⛵',
    tips: 'Começa com um café na Baixa, sobe à Mouraria ao almoço e termina com fado na Alfama.',
    stops: [
      { name: 'A Tasquinha do Fado', tip: 'Fado ao vivo e bacalhau à lagareiro.' },
      { name: 'Casa das Iscas', tip: 'Menu do dia económico com iscas inesquecíveis.' },
      { name: 'Zé da Mouraria', tip: 'Bifes gigantes e ambiente 100% tasca.' },
      { name: 'Adega dos Arcos', tip: 'Chouriço assado e vinho da casa.' },
      { name: 'Taberna da Rua das Flores', tip: 'Petiscos autorais com toque caseiro.' },
    ],
  },
  {
    title: 'Porto Clássico (Ribeira/Miragaia)',
    emoji: '🚢',
    tips: 'Ribeira para vistas do Douro, finaliza na Francesinha acompanhada por fino gelado.',
    stops: [
      { name: 'Adega São Nicolau', tip: 'Tripas e bacalhau com sabor a Norte.' },
      { name: 'Taberna Santo António', tip: 'Menu do dia com vista para o Douro.' },
      { name: 'Tasquinha do Olival', tip: 'Petiscos para partilhar e vinho do Porto.' },
      { name: 'Casa Guedes', tip: 'Sandes de pernil com queijo da Serra.' },
      { name: 'Café Santiago', tip: 'Francesinha clássica para fechar a noite.' },
    ],
  },
  {
    title: 'Braga/Guimarães Tradicional',
    emoji: '🏰',
    tips: 'Roteiro entre o Minho e a história, perfeito para petiscos de tarde.',
    stops: [
      { name: 'Cantinho Minhoto', tip: 'Papas de sarrabulho e rojões.' },
      { name: 'Tasca da Sé', tip: 'Pataniscas e vinho verde fresco.' },
      { name: 'Taberna Tio Júlio', tip: 'Caldo verde e rojões à moda do Minho.' },
      { name: 'Adega Típica de Guimarães', tip: 'Arroz de cabidela e enchidos artesanais.' },
      { name: 'Casa Borges', tip: 'Doces conventuais para sobremesa.' },
    ],
  },
];

export default function RoteirosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {itineraries.map((itinerary) => (
        <View key={itinerary.title} style={styles.card}>
          <Text style={styles.title}>{`${itinerary.emoji} ${itinerary.title}`}</Text>
          <Text style={styles.tip}>{itinerary.tips}</Text>
          {itinerary.stops.map((stop, index) => (
            <View key={stop.name} style={styles.stopRow}>
              <Chip label={`${index + 1}. ${stop.name}`} icon="🧭" />
              <Text style={styles.stopTip}>{stop.tip}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.bege,
    gap: spacing.lg,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.branco,
    borderRadius: 12,
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.azulejo,
  },
  tip: {
    color: colors.cinzaTexto,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  stopRow: {
    marginBottom: spacing.sm,
  },
  stopTip: {
    marginTop: spacing.xs,
    color: colors.cinzaMedio,
  },
});
