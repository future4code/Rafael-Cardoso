export const verifyAge = (casino:Casino, users:User[]):Result => {
  const allowed:User[] = [];
  const unallowed:User[] = [];

  users.forEach((item:User) => {
    if (casino.location === LOCATION.EUA) {
      if (item.age >= 21) {
        allowed.push(item);
      } else {
        unallowed.push(item);
      }
    } else if (casino.location === LOCATION.BRAZIL) {
      if (item.age >= 18) {
        allowed.push(item);
      } else {
        unallowed.push(item);
      }
    }
  });

  const result:Result = {
    brazilians: {
      allowed: allowed.filter((item:User) => item.nacionality === NACIONALITY.BRAZILIAN).map((it:User) => it.name),
      unallowed: unallowed.filter((item:User) => item.nacionality === NACIONALITY.BRAZILIAN).map((it:User) => it.name)
    },
    americans: {
      allowed: allowed.filter((item:User) => item.nacionality === NACIONALITY.AMERICAN).map((it:User) => it.name),
      unallowed: unallowed.filter((item:User) => item.nacionality === NACIONALITY.AMERICAN).map((it:User) => it.name)
    }
  }

  return result;
}

export interface User {
  name:string;
  age:number;
  nacionality:NACIONALITY;
}

export interface Casino {
  name:string;
  location:LOCATION;
}

export interface Result {
  brazilians:ResultItem;
  americans:ResultItem;
}

export interface ResultItem {
  allowed:string[];
  unallowed:string[];
}

export enum LOCATION {
  EUA = 'EUA',
  BRAZIL = 'BRAZIL'
}

export enum NACIONALITY {
  BRAZILIAN = 'BRAZILIAN',
  AMERICAN = 'AMERICAN'
}