module.exports = {
  'type': 'postgres',
  'host': 'localhost',
  'port': 5432,
  'username': 'user',
  'password': 'pass',
  'database': 'contact',
  'synchronize': false,
  'logging': false,
  entities: ['src/entity/*.ts'],
  'migrations': [
    './src/migration/**/*.ts'
  ],
  'subscribers': [
    './src/subscriber/**/*.ts'
  ],
  'cli': {
    'migrationsDir': 'src/migration',
    'entitiesDir': 'src/entity'
  }
}
