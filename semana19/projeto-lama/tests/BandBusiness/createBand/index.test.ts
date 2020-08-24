import { BandBusiness } from "../../../src/business/BandBusiness";
import { USER_ROLES } from "../../../src/model/User";
import { Band } from "../../../src/model/Band";

describe('Testing BandBusiness.createBand', () => {
  let idGenerator = {};
  let authenticator = {};
  let bandDatabase = {};

  test(`Should return 'Missing parameters' for empty name`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.createBand('token', {
        name: '',
        musicGenre: 'rock',
        responsible: 'Chiquinha'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Missing parameters' for empty music genre`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.createBand('token', {
        name: 'Freak',
        musicGenre: '',
        responsible: 'Chiquinha'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Missing parameters' for empty responsible`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.createBand('token', {
        name: 'Freak',
        musicGenre: 'rock',
        responsible: ''
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Only admin can register a band' for a not admin user`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.createBand('token', {
        name: 'Freak',
        musicGenre: 'rock',
        responsible: 'Chiquinha'
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Only admin can register a band');
    }
  });

  test(`Should return 'Invalid music genre' for invalid music genre`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.ADMIN}));
    authenticator = { getData };

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.createBand('token', {
        name: 'Freak',
        musicGenre: 'brega',
        responsible: 'Chiquinha'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid music genre');
    }
  });

  test(`Should return 'Band created successfully' in case of success`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.ADMIN}));
    authenticator = { getData };

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    const createBand = jest.fn((band:Band) => {});
    bandDatabase = { createBand };

    const bandBusiness = new BandBusiness(
      idGenerator as any,
      authenticator as any,
      bandDatabase as any
    );

    const result = await bandBusiness.createBand('token', {
      name: 'Freak',
      musicGenre: 'folk',
      responsible: 'Chiquinha'
    });

    expect(result.message).toBe('Band created successfully');
    expect(generateId).toHaveBeenCalledTimes(1);
  });
});