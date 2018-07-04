import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { createAccountMockPromise } from './lib/account-mock';
import { removeAllResources } from './lib/profile-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api`;

describe('TESTING ROUTER PROFILE', () => {
  let mockData;
  let token;
  let account;
  beforeAll(async () => {
    startServer();
  });
  afterAll(stopServer);
  beforeEach(async () => {
    await removeAllResources();
    try {
      mockData = await createAccountMockPromise();
      account = mockData.account; /*eslint-disable-line*/
      token = mockData.token; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });

  describe('POST PROFILE ROUTES TESTING', () => {
    test('POST 200 to /api/profiles for successful profile creation', async () => {
      const mockProfile = {
        bio: faker.lorem.words(20),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };
      try {
        const response = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${token}`)
          .send(mockProfile);
        expect(response.status).toEqual(200);
        expect(response.body.accountId).toEqual(account._id.toString());
        expect(response.body.firstName).toEqual(mockProfile.firstName);
        expect(response.body.lastName).toEqual(mockProfile.lastName);
        expect(response.body.email).toEqual(mockProfile.email);
        expect(response.body.bio).toEqual(mockProfile.bio);
      } catch (err) {
        expect(err).toEqual('POST 200 unsuccessful profile creation');
      }
    });

    test('POST 400 for trying to post a profile with a bad token', async () => {
      try {
        const response = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', 'Bearer THISABADTOKEN');
        expect(response).toEqual('POST 400- shouldn\'t hit try block');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });

    test('POST 400 to api/profiles for missing required firstName', async () => {
      const mockProfile = {
        bio: faker.lorem.words(20),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };
      try {
        const response = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${token}`)
          .send(mockProfile);
        expect(response.status).toEqual('POST 400- should not reach this');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
  });
});
