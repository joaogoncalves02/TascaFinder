import { colors } from './colors';

export const tileStyles = {
  container: {
    borderWidth: 2,
    borderColor: colors.azulejo,
    backgroundColor: colors.bege,
    borderRadius: 12,
  },
  header: {
    backgroundColor: colors.azulejo,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    color: colors.branco,
    fontSize: 22,
    fontWeight: '700' as const,
    textAlign: 'center' as const,
  },
  subheaderText: {
    color: colors.bege,
    fontSize: 14,
    textAlign: 'center' as const,
  },
};
