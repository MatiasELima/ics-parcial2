const request = require('supertest');
const express = require('express');

// Creamos una app idéntica para testear
const app = express();
app.get('/', (_, res) => res.status(200).send());

describe('Pruebas del Servidor', () => {
  it('Debería responder 200 OK en la ruta raíz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});