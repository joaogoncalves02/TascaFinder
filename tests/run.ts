import { runGeoTests } from './geo.test';
import { runScheduleTests } from './schedule.test';

try {
  runGeoTests();
  runScheduleTests();
  console.log('✅ Todos os testes passaram');
} catch (error) {
  console.error('❌ Falha nos testes:', error);
  process.exit(1);
}
