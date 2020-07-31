import { BaseDatabase } from "../BaseDatabase";
import { Show, WEEK_DAYS, GetShowsResponseDTO } from "../../model/Show";
import { BandDatabase } from "../BandDatabase";

import { InternalServerError } from "../../error/InternalServerError";

export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME:string = 'LamaShow';

  public static getTableName = ():string => ShowDatabase.TABLE_NAME;

  public createShow = async (input:Show):Promise<void> => {
    const id = input.getId();
    const week_day = input.getWeekDay();
    const start_time = input.getStartTime();
    const end_time = input.getEndTime();
    const band_id = input.getBandId();
    try {
      await this.getConnection()
        .insert({ id, week_day, start_time, end_time, band_id })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public checkShowAlreadyCreated = async (input:Show):Promise<boolean> => {
    const week_day = input.getWeekDay();
    const start_time = input.getStartTime();
    const end_time = input.getEndTime();
    try {
      const result = await this.getConnection()
        .select('*')
        .from(ShowDatabase.TABLE_NAME)
        .where({ week_day })
        .andWhere('start_time','<', end_time)
        .andWhere('end_time', '>', start_time);
      if (result.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getShowsByDay = async (weekDay:WEEK_DAYS):Promise<GetShowsResponseDTO[]> => {
    const s = ShowDatabase.TABLE_NAME;
    const b = BandDatabase.getTableName();
    try {
      const result = await this.getConnection()
        .select(`${b}.name as bandName`, `${b}.music_genre as musicGenre`)
        .from(s)
        .join(b, `${s}.band_id`, `${b}.id`)
        .where(`${s}.week_day`, weekDay)
        .orderBy(`${s}.start_time`, 'asc');
      return result;
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}