import { covidDistricts, covidGermany, covidStates } from "./api";
import {
  coivdGermanyResponse,
  coviddisctrictsResponse,
  covidStatesResponse,
} from "./apitypes";

let lastCache = "";

let lastCacheSuccess = false;
let cache: {
  germany?: coivdGermanyResponse;
  states?: covidStatesResponse;
  districts?: coviddisctrictsResponse;
} = {};

//#region Stupid functions
const hasToCache = () => lastCache != getDate();
const getDate = () => new Date().toLocaleDateString("de");
const getIsSuccess = () =>
  cache.germany != undefined &&
  cache.districts != undefined &&
  cache.states != undefined;
//#endregion

export const runCache = async (): Promise<void> => {
  if (!lastCacheSuccess || hasToCache()) {
    console.log("Cached:", { lastCacheSuccess, hasToCache: hasToCache() });
    lastCache = getDate();
    const germany = (await covidGermany()).data;
    const districts = (await covidDistricts()).data;
    const states = (await covidStates()).data;
    cache = {
      germany,
      districts,
      states,
    };
    lastCacheSuccess = getIsSuccess();
    console.log(lastCacheSuccess ? "Success" : "Failed", {
      germany: germany != undefined,
      districts: districts != undefined,
      states: states != undefined,
    });
  }
};

export const backgroundCacheStart = (): void => {
  runCache();
  setInterval(() => runCache(), 20000);
};

//#region getters
export const covidGermanyCache = async (): Promise<{
  ok: boolean;
  data?: coivdGermanyResponse;
}> => {
  return { ok: cache.germany != undefined, data: cache.germany };
};

export const covidStatesCache = async (): Promise<{
  ok: boolean;
  data?: covidStatesResponse;
}> => {
  return { ok: cache.states != undefined, data: cache.states };
};

export const covidDistrictsCache = async (): Promise<{
  ok: boolean;
  data?: coviddisctrictsResponse;
}> => {
  return { ok: cache.states != undefined, data: cache.districts };
};
//#endregion
