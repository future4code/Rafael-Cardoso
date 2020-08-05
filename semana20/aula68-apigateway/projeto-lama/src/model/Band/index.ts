import { InvalidParameterError } from "../../error/InvalidParameterError";

export class Band {
  constructor (
    private id:string,
    private name:string,
    private musicGenre:MUSIC_GENRES,
    private responsible:string
  ) {}

  public getId = ():string => this.id;

  public getName = ():string => this.name;

  public getMusicGenre = ():MUSIC_GENRES => this.musicGenre;

  public getResponsible = ():string => this.responsible;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setName = (name:string):void => {
    this.name = name;
  }

  public setMusicGenre = (musicGenre:MUSIC_GENRES):void => {
    this.musicGenre = musicGenre;
  }

  public setResponsible = (responsible:string):void => {
    this.responsible = responsible;
  }

  public static toBandModel = (band:any):Band => (
    new Band(band.id, band.name, band.musicGenre, band.responsible)
  )
}

export const stringToMusicGenre = (genre:string):MUSIC_GENRES => {
  switch (genre.toLowerCase()) {
    case 'rock':
      return MUSIC_GENRES.ROCK;
    case 'alternative':
      return MUSIC_GENRES.ALTERNATIVE;
    case 'metal':
      return MUSIC_GENRES.METAL;
    case 'pop':
      return MUSIC_GENRES.POP;
    case 'classical':
      return MUSIC_GENRES.CLASSICAL;
    case 'jazz':
      return MUSIC_GENRES.JAZZ;
    case 'hip-hop/rap':
      return MUSIC_GENRES.HIPHOPNRAP;
    case 'r&b/soul':
      return MUSIC_GENRES.RNBNSOUL;
    case 'country':
      return MUSIC_GENRES.COUNTRY;
    case 'samba':
      return MUSIC_GENRES.SAMBA;
    case 'mpb':
      return MUSIC_GENRES.MPB;
    case 'reggae':
      return MUSIC_GENRES.REGGAE;
    case 'folk':
      return MUSIC_GENRES.FOLK;
    default:
      throw new InvalidParameterError('Invalid music genre');
  }
}

export interface CreateBandInputDTO {
  name:string;
  musicGenre:string;
  responsible:string;
}

export interface CreateBandResponseDTO {
  message:string;
}

export enum MUSIC_GENRES {
  ROCK = 'ROCK',
  ALTERNATIVE = 'ALTERNATIVE',
  METAL = 'METAL',
  POP = 'POP',
  CLASSICAL = 'CLASSICAL',
  JAZZ = 'JAZZ',
  HIPHOPNRAP = 'HIP-HOP/RAP',
  RNBNSOUL = 'R&B/SOUL',
  COUNTRY = 'COUNTRY',
  SAMBA = 'SAMBA',
  MPB = 'MPB',
  REGGAE = 'REGGAE',
  FOLK = 'FOLK'
}