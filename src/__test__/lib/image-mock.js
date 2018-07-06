import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock';
import Image from '../../model/image';
import Account from '../../model/account';

const createSoundMockPromise = async () => {
  const mockData = {};
  // mockAcctResponse will equal:
  /*
    {
      originalRequest: {},
      token: some token,
      account: { mongDb account}
    }
  */
  const mockAcctResponse = await createAccountMockPromise();
  // console.log(mockAcctResponse, 'inside async await');
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const image = await new Image({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  // console.log(sound, 'SOUND')
  mockData.image = image;
  return mockData;
};

const removeImageAndAccounts = () => {
  return Promise.all([
    Image.remove({}),
    Account.remove({}),
  ]);
};


export { createSoundMockPromise, removeImageAndAccounts };
