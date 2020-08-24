import { ShowBusiness } from "../../../src/business/ShowBusiness";
import { USER_ROLES } from "../../../src/model/User";
import { WEEK_DAYS } from "../../../src/model/Show";
import { MUSIC_GENRES } from "../../../src/model/Band";

describe('Testing ShowBusiness.getShowsByDay', () => {
  let idGenerator = {};
  let authenticator = {};
  let showDatabase = {};

  test(`Should return 'Missing parameters' for empty day`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.getShowsByDay('token', '');
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Invalid week day' for empty startTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.getShowsByDay('token', 'monday');
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid week day');
    }
  });

  test(`Should return an empty array for a day with no show scheduled`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    const getShowsByDay = jest.fn((day:WEEK_DAYS) => ([]));
    showDatabase = { getShowsByDay };

    const showBusiness = new ShowBusiness(
      idGenerator as any,
      authenticator as any,
      showDatabase as any
    );

    const result = await showBusiness.getShowsByDay('token', 'sunday');

    expect(getShowsByDay).toHaveBeenCalledWith(WEEK_DAYS.SUNDAY);
    expect(result).toEqual([]);
  });

  test(`Should return an empty array for a day with no show scheduled`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    const getShowsByDay = jest.fn((day:WEEK_DAYS) => ([{
      bandName: 'Freak',
      musicGenre: MUSIC_GENRES.SAMBA
    }]));
    showDatabase = { getShowsByDay };

    const showBusiness = new ShowBusiness(
      idGenerator as any,
      authenticator as any,
      showDatabase as any
    );

    const result = await showBusiness.getShowsByDay('token', 'sunday');

    expect(getShowsByDay).toHaveBeenCalledWith(WEEK_DAYS.SUNDAY);
    expect(result).toContainEqual({
      bandName: 'Freak',
      musicGenre: MUSIC_GENRES.SAMBA
    });
  });
});