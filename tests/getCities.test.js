const { getAllCitiesUseCase, getCitiesByCountryUseCase, getCitiesByCityNameAndCountryUseCase } = require('../src/domain/cities/use_cases/getCities');
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

  test('getCitiesByCountryUseCase debe devolver un mensaje si no se encuentran ciudades para un país dado', async () => {
    // Preparar
    const country = 'NonExistentCountry';
    const ctx = { params: { country }, body: {} };
    const expectedMessage = { message: "No se encontraron ciudades para el país ingresado" };

    // Ejecutar
    await getCitiesByCountryUseCase(ctx);

    // Comprobar
    expect(ctx.status).toEqual(200);
    expect(ctx.body).toEqual(expectedMessage);
  });

  test('getCitiesByCountryUseCase debe devolver un mensaje si se ingresan caracteres numéricos', async () => {
    // Preparar
    const country = '123';
    const ctx = { params: { country }, body: {} };
    const expectedMessage = { message: "Solo se aceptan caracteres no numéricos" };

    // Ejecutar
    await getCitiesByCountryUseCase(ctx);

    // Comprobar
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual(expectedMessage);
  });

  test('getCitiesByCityNameAndCountryUseCase debe devolver todas las ciudades para un país y ciudad dados', async () => {
    // Preparar
    const city = 'Mexico City';
    const country = 'Mexico';
    const ctx = { params: { city, country }, body: {} };
    const cityInMexico = worldCities.find(c => c.name.toLowerCase() === city.toLowerCase() && c.country.toLowerCase() === country.toLowerCase());

    // Ejecutar
    await getCitiesByCityNameAndCountryUseCase(ctx);

    // Comprobar
    expect(ctx.body).toEqual(cityInMexico);
  });

  test('getCitiesByCityNameAndCountryUseCase debe devolver un mensaje si no se encuentran ciudades para un país y ciudad dados', async () => {
    // Preparar
    const city = 'NonExistentCity';
    const country = 'NonExistentCountry';
    const ctx = { params: { city, country }, body: {} };
    const expectedMessage = { message: "No se encontraron ciudades para el país ingresado" };

    // Ejecutar
    await getCitiesByCityNameAndCountryUseCase(ctx);

    // Comprobar
    expect(ctx.status).toEqual(200);
    expect(ctx.body).toEqual(expectedMessage);
  });
});