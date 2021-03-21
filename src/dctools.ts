import { MessageEmbed } from "discord.js";

export const toCode = (input: string | number): string => {
  return "`" + input + "`";
};
export const toFat = (input: string | number): string => {
  return "**" + input + "**";
};
export const multiLine = (...args: string[]): string => {
  let out = "";
  args.forEach((e) => {
    out += e + "\n";
  });
  return out;
};

export const makeEmbed = (input: {
  title: string;
  time: Date;
  delta: { cases: number; deaths: number; recovered: number };
  present: { cases: number; deaths: number; recovered: number };
  weekIncidence: number;
  locationInfo: { name: string; value: string };
  contact: string;
  rwert?: { name: string; value: string };
  source: string;
}): MessageEmbed => {
  const out = new MessageEmbed();
  out.addFields([
    input.locationInfo,
    {
      name: "Inzidenz",
      value: toCode(input.weekIncidence.toFixed(2)),
    },
    {
      name: "Gesamt",
      value: multiLine(
        "Fälle: " + toCode(input.present.cases),
        "Tode: " + toCode(input.present.deaths),
        "Genesen: " + toCode(input.present.recovered)
      ),
    },
    {
      name: "Delta",
      value: multiLine(
        "Fälle: " + toCode(input.delta.cases),
        "Tode: " + toCode(input.delta.deaths),
        "Genesen: " + toCode(input.delta.recovered)
      ),
    },
  ]);
  if (input.rwert) {
    out.addField(input.rwert.name, input.rwert.value);
  }
  out.addFields([{ name: "Kontakt", value: "API:" + " " + input.contact }]);
  out.setTitle("Corona in :sparkles:" + input.title + ":sparkles: ");
  out.setTimestamp(input.time);
  out.setAuthor(input.source);
  return out;
};
