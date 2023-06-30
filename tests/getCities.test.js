const { getAllCitiesUseCase, getCitiesByCountryUseCase } = require('../src/domain/cities/use_cases/getCities');
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

  test('getCitiesByCountryUseCase debe devolver todas las ciudades para un país dado', async () => {
    // Preparar
    const country = 'Mexico';
    const ctx = { params: { country }, body: {} };
    const citiesInMexico = worldCities.filter(city => city.country.toLowerCase() === country.toLowerCase());

    // Ejecutar
    await getCitiesByCountryUseCase(ctx);

    // Comprobar
    expect(ctx.body).toEqual(citiesInMexico);
  });
});