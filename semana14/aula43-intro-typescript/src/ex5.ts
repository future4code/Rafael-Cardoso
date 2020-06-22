enum HistoricalPeriods {
  PH = 100000,
  IA = 4000,
  IME = 476,
  IMO = 1453,
  IC = 1789,
  CY = 2020
}

const definePeriodForYear = (year: number, period?: string):string => {
  const era: string = period || 'DC';
  if (era === 'DC') {
    if (year <= HistoricalPeriods.IME) {
      return 'Idade Antiga';
    }
    if (year <= HistoricalPeriods.IMO) {
      return 'Idade Média';
    }
    if (year <= HistoricalPeriods.IC) {
      return 'Idade Moderna';
    }
    if (year <= HistoricalPeriods.CY) {
      return 'Idade Contemporânea';
    }
    if (year > HistoricalPeriods.CY) {
      return 'Favor não escolha um ano no futuro';
    } 
  }
  if (era === 'AC') {
    if (year <= HistoricalPeriods.IA) {
      return 'Idade Antiga';
    }
    if (year <= HistoricalPeriods.PH) {
      return 'Pré-história';
    }
    if (year > HistoricalPeriods.PH) {
      return 'Favor escolha um ano que acredita-se já ter presença da humanidade';
    }
  }
  return 'Favor escolha uma era válida';
}

console.log(definePeriodForYear(60000, 'AC'));
console.log(definePeriodForYear(4000));
console.log(definePeriodForYear(1500));
console.log(definePeriodForYear(10000000, 'AC'));
console.log(definePeriodForYear(6700, 'BC'));
console.log(definePeriodForYear(300, 'DC'));
console.log(definePeriodForYear(1945));
console.log(definePeriodForYear(1206, 'DC'));
console.log(definePeriodForYear(2000, 'AC'));
