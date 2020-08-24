import { IdGenerator } from "../../service/IdGenerator";
import { Authenticator, AuthenticationData } from "../../service/Authenticator";
import { BandDatabase } from "../../data/BandDatabase";
import { Band, stringToMusicGenre, CreateBandInputDTO, CreateBandResponseDTO } from "../../model/Band";
import { stringToUserRole, USER_ROLES } from "../../model/User";

import { InvalidParameterError } from "../../error/InvalidParameterError";
import { UnauthorizedError } from "../../error/UnauthorizedError";
import { NotFoundError } from "../../error/NotFoundError";

export class BandBusiness {
  constructor (
    private idGenerator:IdGenerator,
    private authenticator:Authenticator,
    private bandDatabase:BandDatabase
  ) {}

  public createBand = async (token:string, input:CreateBandInputDTO):Promise<CreateBandResponseDTO> => {
    const authData:AuthenticationData = this.authenticator.getData(token);

    const { name, musicGenre, responsible } = input;

    if (!name || !musicGenre || !responsible) {
      throw new InvalidParameterError('Missing parameters');
    }

    if (stringToUserRole(authData.role) !== USER_ROLES.ADMIN) {
      throw new UnauthorizedError('Only admin can register a band');
    }

    const id = this.idGenerator.generateId();
    await this.bandDatabase.createBand(Band.toBandModel({
      id,
      name,
      musicGenre: stringToMusicGenre(musicGenre),
      responsible
    }));

    return { message: 'Band created successfully' };
  }

  public getBandByQuery = async (token:string, query:string):Promise<Band> => {
    this.authenticator.getData(token);

    if (!query) {
      throw new InvalidParameterError('Missing parameters');
    }

    const band = await this.bandDatabase.getBandByQuery(query);

    if (!band) {
      throw new NotFoundError('Band not found');
    }

    return band;
  }
}