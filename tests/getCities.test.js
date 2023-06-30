const { getAllCitiesUseCase } = require('../src/domain/cities/use_cases/getCities');
const worldCities = require('../dataset/world-cities_json.json');

describe('Test para getCities', () => {
  test('getAllCitiesUseCase debe devolver todos los países disponibles', async () => {
    // Preparar
    const ctx = { body: {} };
    const allCities = worldCities; // Utilizamos los datos del archivo JSON

    // Ejecutar
    await getAllCitiesUseCase(ctx);

    // Comprobar
    expect(ctx.body).toEqual(allCities);
  });
});