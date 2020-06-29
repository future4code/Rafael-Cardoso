import * as fs from 'fs';

export class JSONFileManager {
  private fileName:string

  constructor (fileName:string) {
    this.fileName = fileName;
  }

  public getObjectFromFile = ():any => {
    const data:Buffer = fs.readFileSync(this.fileName);
    const objectArray:any[] = data.toString() ? JSON.parse(data.toString()) : [];
    return objectArray;
  }

  public writeObjectToFile = (objectToSave:any):void => {
    fs.writeFileSync(this.fileName, JSON.stringify(objectToSave, null, 2));
  }
}