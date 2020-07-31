import { IdGenerator } from "../../service/IdGenerator";
import { Authenticator, AuthenticationData } from "../../service/Authenticator";
import { ShowDatabase } from "../../data/Showdatabase";
import { Show, stringToWeekDays, CreateShowInputDTO, CreateShowResponseDTO, GetShowsResponseDTO } from '../../model/Show';
import { stringToUserRole, USER_ROLES } from "../../model/User";

import { InvalidParameterError } from "../../error/InvalidParameterError";
import { UnauthorizedError } from "../../error/UnauthorizedError";

export class ShowBusiness {
  constructor (
    private idGenerator:IdGenerator,
    private authenticator:Authenticator,
    private showDatabase:ShowDatabase
  ) {}

  public createShow = async (token:string, input:CreateShowInputDTO):Promise<CreateShowResponseDTO> => {
    const authData:AuthenticationData = this.authenticator.getData(token);

    const { weekDay, startTime, endTime, bandId } = input;

    if (!weekDay || !startTime || !endTime || !bandId) {
      throw new InvalidParameterError('Missing parameters');
    }

    if (startTime < 8 || startTime > 23 || endTime < 8 || endTime > 23) {
      throw new InvalidParameterError('Invalid time');
    }

    if (startTime > endTime) {
      throw new InvalidParameterError('Show must finish after it starts');
    }

    if (stringToUserRole(authData.role) !== USER_ROLES.ADMIN) {
      throw new UnauthorizedError('Only admin can create a show');
    }

    const id = this.idGenerator.generateId();
    const newShow = Show.toShowModel({
      id,
      weekDay: stringToWeekDays(weekDay),
      startTime,
      endTime,
      bandId
    });

    const isNotPossibleToCreateShow = await this.showDatabase.checkShowAlreadyCreated(newShow);

    if (isNotPossibleToCreateShow) {
      throw new InvalidParameterError('There is a show scheduled for this time already');
    }

    await this.showDatabase.createShow(newShow);

    return { message: 'Show scheduled successfully' };
  }

  public getShowsByDay = async (token:string, day:string):Promise<GetShowsResponseDTO[]> => {
    this.authenticator.getData(token);

    if (!day) {
      throw new InvalidParameterError('Missing parameters');
    }

    const weekDay = stringToWeekDays(day);

    const shows:GetShowsResponseDTO[] = await this.showDatabase.getShowsByDay(weekDay);

    return shows;
  }
}