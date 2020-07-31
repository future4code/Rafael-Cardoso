import { ShowBusiness } from '../../../src/business/ShowBusiness';
import { USER_ROLES } from "../../../src/model/User";
import { Show } from '../../../src/model/Show';

describe('Testing ShowBusiness.createShow', () => {
  let idGenerator = {};
  let authenticator = {};
  let showDatabase = {};

  test(`Should return 'Missing dependencies' for empty weekDay`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: '',
        startTime: 9,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Missing dependencies' for empty startTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 0,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Missing dependencies' for empty endTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 9,
        endTime: 0,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Missing dependencies' for empty bandId`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 9,
        endTime: 12,
        bandId: ''
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Invalid time' for invalid startTime or endTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 7,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid time');
    }
  });

  test(`Should return 'Invalid time' for invalid startTime or endTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 24,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid time');
    }
  });

  test(`Should return 'Invalid time' for invalid startTime or endTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 12,
        endTime: 6,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid time');
    }
  });

  test(`Should return 'Invalid time' for invalid startTime or endTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 12,
        endTime: 24,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid time');
    }
  });

  test(`Should return 'Show must finish after it starts' for empty startTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 14,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Show must finish after it starts');
    }
  });

  test(`Should return 'Only admin can create a show' for empty startTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.NORMAL}));
    authenticator = { getData };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 10,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Only admin can create a show');
    }
  });

  test(`Should return 'Invalid week day' for empty startTime`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.ADMIN}));
    authenticator = { getData };

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'tuesday',
        startTime: 10,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid week day');
    }
  });

  test(`Should return 'There is a show scheduled for this time already' for period occupied`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.ADMIN}));
    authenticator = { getData };

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    const checkShowAlreadyCreated = jest.fn((show:Show) => true);
    showDatabase = { checkShowAlreadyCreated };

    try {
      const showBusiness = new ShowBusiness(
        idGenerator as any,
        authenticator as any,
        showDatabase as any
      );

      await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 10,
        endTime: 12,
        bandId: 'bandId'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('There is a show scheduled for this time already');
    }
  });

  test(`Should return 'Show scheduled successfully' in case of success`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', role:USER_ROLES.ADMIN}));
    authenticator = { getData };

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    const checkShowAlreadyCreated = jest.fn((show:Show) => false);
    const createShow = jest.fn((show:Show) => {});
    showDatabase = { checkShowAlreadyCreated, createShow };

    const showBusiness = new ShowBusiness(
      idGenerator as any,
      authenticator as any,
      showDatabase as any
    );

    const result = await showBusiness.createShow('token', {
        weekDay: 'sunday',
        startTime: 10,
        endTime: 12,
        bandId: 'bandId'
      });

    expect(result.message).toBe('Show scheduled successfully');
    expect(generateId).toHaveBeenCalledTimes(1);
  });
});