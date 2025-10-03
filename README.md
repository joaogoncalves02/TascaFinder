# TascaFinder

TascaFinder é um MVP Expo + React Native focado em tascas portuguesas autênticas. Funciona offline-first com SQLite e pode ser utilizado tanto em Android como em iOS através do Expo Go.

## Requisitos

- Node.js LTS
- npm ou yarn
- Expo CLI (`npx expo`)

## Scripts

- `npm run dev` — inicia o Metro Bundler.
- `npm run android` — compila e instala a app num dispositivo/emulador Android.
- `npm run ios` — compila e instala a app num simulador iOS.
- `npm run lint` — corre o ESLint.
- `npm run format` — formata o código com Prettier.
- `npm run seed` — executa o script de seed manual (útil para repor dados de teste).
- `npm run test` — corre testes unitários simples (haversine e horário).

## Permissões

- Localização — utilizada para ordenar tascas por proximidade e auto-preencher formulários. O app funciona sem esta permissão, mas a ordenação recorre ao rating.

## Limitações conhecidas

- Não existem mapas embebidos; o botão "Abrir no mapa" apenas delega para a aplicação de mapas do sistema via deep links.
- Imagens, ícones externos e fontes personalizadas não são suportados. Emojis e cores sólidas são usados para identidade visual.
- Publicidade é apenas um placeholder (`<AdPlaceholder />`). No futuro poderá ser integrado AdMob.

## Roadmap futuro

- Sincronização com backend remoto (REST) utilizando o campo `pending_sync`.
- Integração de autenticação real e perfis online.
- Sistema de moderação de reviews e sugestões.
- Monetização com SDK de anúncios.

## Licença

MIT
