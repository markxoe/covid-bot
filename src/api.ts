import axios from "axios";

import {
  coivdGermanyResponse,
  coviddisctrictsResponse,
  covidStatesResponse,
} from "./apitypes";

export const covidGermany = async (): Promise<{
  ok: boolean;
  data?: coivdGermanyResponse;
}> => {
  let out: {
    ok: boolean;
    data?: coivdGermanyResponse;
  } = {
    ok: false,
  };

  out = await axios
    .get("https://api.corona-zahlen.org/germany")
    .then((r) => {
      if (r.status == 200) return { ok: true, data: r.data };
      else return { ok: false };
    })
    .catch((err) => {
      console.log("Error calling API:", err);
      return { ok: false };
    });

  return out;
};

export const covidDistricts = async (): Promise<{
  ok: boolean;
  data?: coviddisctrictsResponse;
}> => {
  const response: {
    ok: boolean;
    data?: coviddisctrictsResponse;
  } = await axios
    .get("https://api.corona-zahlen.org/districts")
    .then((r) => {
      if (r.status === 200) return { ok: true, data: r.data };
      else return { ok: false };
    })
    .catch((err) => {
      console.log("Error calling API:", err);
      return { ok: false };
    });

  return response;
};

export const covidStates = async (): Promise<{
  ok: boolean;
  data?: covidStatesResponse;
}> => {
  const response: {
    ok: boolean;
    data?: covidStatesResponse;
  } = await axios
    .get("https://api.corona-zahlen.org/states")
    .then((r) => {
      if (r.status === 200) return { ok: true, data: r.data };
      else return { ok: false };
    })
    .catch((err) => {
      console.log("Error calling API:", err);
      return { ok: false };
    });

  return response;
};
