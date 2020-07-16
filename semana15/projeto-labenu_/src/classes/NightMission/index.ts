import { Mission } from '../Mission';

export class NightMission extends Mission {
  protected name:string = '';
  public setName = (name:string):void => {
    if (name.indexOf('-na-night') !== -1) {
      this.name = name;
      this.updateMissionJSON();
    }
  }
}