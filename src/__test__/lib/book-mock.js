'use strict';

import 'babel-polyfill'; 
import faker from 'faker';
import { createAccountMockPromise } from './account-mock';
import Book from '../../model/book';

const createBookMockPromise = async () => {
  const mockAcctResponse = await createAccountMockPromise();

  const book = await new Book({
    title: faker.lorem.words(3),
    author: faker.lorem.words(2),
    accountId: mockAcctResponse.account._id,
  }).save();

  const mockData = {
    book,
    account: mockAcctResponse.account,
    token: mockAcctResponse.token,
  };

  return mockData;
};

export default createBookMockPromise;
