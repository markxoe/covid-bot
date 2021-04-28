export interface covidMeta {
  source: string;
  contact: string;
  info: string;
  lastUpdate: string;
  lastCheckedForUpdate: string;
}

export interface coivdGermanyResponse {
  cases: number;
  deaths: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  casesPerWeek: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
  };
  r: {
    value: number;
    date: string;
  };
  meta: covidMeta;
}

export interface coviddisctrictResponse {
  ags: string;
  name: string;
  county: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
  };
}
export interface coviddisctrictsResponse {
  data: { [key: string]: coviddisctrictResponse };
  meta: covidMeta;
}

export interface covidStateResponse {
  id: 1;
  name: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  abbreviation: string;
  weekIncidence: number;
  casesPer100k: number;
  delta: {
    cases: number;
    deaths: number;
    recovered: number;
  };
}
export interface covidStatesResponse {
  data: { [key: string]: covidStateResponse };
  meta: covidMeta;
}
