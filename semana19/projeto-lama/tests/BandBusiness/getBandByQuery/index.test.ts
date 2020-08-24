import { BandBusiness } from "../../../src/business/BandBusiness";
import { USER_ROLES } from "../../../src/model/User";
import { Band, MUSIC_GENRES } from "../../../src/model/Band";

describe('Testing BandBusiness.getBandByQuery', () => {
  let idGenerator = {};
  let authenticator = {};
  let bandDatabase = {};

  test(`Should return 'Missing parameters' for empty query`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.getBandByQuery('token', '');
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Band not found' when there is no band with the provided id`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id: 'id', role: USER_ROLES.NORMAL}));
    authenticator = { getData };

    const getBandByQuery = jest.fn((query:string) => {});
    bandDatabase = { getBandByQuery };

    try {
      const bandBusiness = new BandBusiness(
        idGenerator as any,
        authenticator as any,
        bandDatabase as any
      );

      await bandBusiness.getBandByQuery('token', 'query');
    } catch (error) {
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Band not found');
    }
  });

  test(`Should return the band in cas of success`, async () => {
    expect.assertions(6);

    const getData = jest.fn((token:string) => ({ id: 'id', role: USER_ROLES.NORMAL}));
    authenticator = { getData };

    const getBandByQuery = jest.fn((query:string) => (
      new Band('id', 'Freak', MUSIC_GENRES.FOLK, 'Chiquinha')
    ));
    bandDatabase = { getBandByQuery };

    const bandBusiness = new BandBusiness(
      idGenerator as any,
      authenticator as any,
      bandDatabase as any
    );

    const result = await bandBusiness.getBandByQuery('token', 'query');

    expect(getData).toHaveBeenCalledWith('token');
    expect(getBandByQuery).toHaveBeenCalledWith('query');
    expect(result.getId()).toEqual('id');
    expect(result.getName()).toEqual('Freak');
    expect(result.getMusicGenre()).toEqual(MUSIC_GENRES.FOLK);
    expect(result.getResponsible()).toEqual('Chiquinha');
  });
});