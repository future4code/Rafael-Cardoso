import { InvalidParameterError } from "../../error/InvalidParameterError";
import { MUSIC_GENRES } from "../Band";

export class Show {
  constructor (
    private id:string,
    private weekDay:WEEK_DAYS,
    private startTime:number,
    private endTime:number,
    private bandId:string
  ) {}

  public getId = ():string => this.id;

  public getWeekDay = ():WEEK_DAYS => this.weekDay;

  public getStartTime = ():number => this.startTime;

  public getEndTime = ():number => this.endTime;

  public getBandId = ():string => this.bandId;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setWeekDay = (weekDay:WEEK_DAYS):void => {
    this.weekDay = weekDay;
  }

  public setStartTime = (startTime:number):void => {
    this.startTime = startTime;
  }

  public setEndTime = (endTime:number):void => {
    this.endTime = endTime;
  }

  public setBandId = (bandId:string):void => {
    this.bandId = bandId;
  }

  public static toShowModel = (show:any):Show => (
    new Show(show.id, show.weekDay, show.startTime, show.endTime, show.bandId)
  )
}

export const stringToWeekDays = (day:string):WEEK_DAYS => {
  switch (day.toLowerCase()) {
    case 'friday':
      return WEEK_DAYS.FRIDAY;
    case 'saturday':
      return WEEK_DAYS.SATURDAY;
    case 'sunday':
      return WEEK_DAYS.SUNDAY;
    default:
      throw new InvalidParameterError('Invalid week day');
  }
}

export interface CreateShowInputDTO {
  weekDay:string,
  startTime:number,
  endTime:number,
  bandId:string
}

export interface CreateShowResponseDTO {
  message:string
}

export interface GetShowsResponseDTO {
  bandName:string,
  musicGenre:MUSIC_GENRES
}

export enum WEEK_DAYS {
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}