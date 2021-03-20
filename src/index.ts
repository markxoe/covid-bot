import { config } from "dotenv";
config();

import * as Discord from "discord.js";
import { covidDistricts, covidGermany, covidStates } from "./api";
import { multiLine, toCode, toFat } from "./dctools";

const client = new Discord.Client();

if (process.env.TOKEN.length == 0) {
  throw Error("Hab kein Token");
}

client.on("message", async (message) => {
  const messageContent = message.content.trim().toLowerCase();

  if (messageContent.startsWith("corona")) {
    const args = messageContent.split(" ");
    if (args.length == 1) {
      message.channel.send(
        multiLine(
          toFat("Der :sparkles:Corona Bot:sparkles:"),
          "",
          toFat("Befehle:"),
          "",
          toCode("corona de") + " Gibt Infos für Deutschland aus",
          toCode("corona lk ...") + "Gibt Infos für einen Landkreis aus",
          toCode("corona bl ...") + "Gibt Infos für ein Bundesland aus"
        )
      );
    } else if (args[1] === "de") {
      const apiCall = await covidGermany();
      if (apiCall.ok && apiCall.data) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Corona in :sparkles:Deutschland:sparkles:");

        embed.addFields([
          {
            name: "Inzidenz",
            value: toCode(apiCall.data.weekIncidence.toFixed(2)),
          },
          {
            name: "Gesamt",
            value: multiLine(
              "Fälle: " + toCode(apiCall.data.cases),
              "Tote: " + toCode(apiCall.data.deaths),
              "Geheilt: " + toCode(apiCall.data.recovered)
            ),
          },
          {
            name: "Delta",
            value: multiLine(
              "Fälle: " + toCode(apiCall.data.delta.cases),
              "Tote: " + toCode(apiCall.data.delta.deaths),
              "Geheilt: " + toCode(apiCall.data.delta.recovered)
            ),
          },
        ]);

        embed.addField(
          "R Wert",
          toCode(apiCall.data.r.value) +
            " (" +
            new Date(apiCall.data.r.date).toLocaleDateString() +
            ")"
        );
        embed.addField("Kontakt", apiCall.data.meta.contact);

        embed.setAuthor(apiCall.data.meta.source);
        embed.setTimestamp(new Date(apiCall.data.meta.lastUpdate));

        message.reply(embed);
      } else message.reply("Es ist ein Fehler aufgetreten, sorry!");
    } else if (args[1] === "bl") {
      const apiCall = await covidStates();
      if (apiCall.ok && apiCall.data) {
        const stateKey = Object.keys(apiCall.data.data).find((i) =>
          apiCall.data.data[i].name.toLowerCase().includes(args[2])
        );
        if (stateKey !== undefined) {
          const state = apiCall.data.data[stateKey];
          const responseEmbed = new Discord.MessageEmbed();

          responseEmbed.addFields([
            {
              name: "Bundesland",
              value: multiLine(
                state.name,
                toCode(state.population) + " Einwohner"
              ),
            },
            {
              name: "Inzidenz",
              value: toCode(state.weekIncidence.toFixed(2)),
            },
            {
              name: "Gesamt",
              value: multiLine(
                "Fälle: " + toCode(state.cases),
                "Tote: " + toCode(state.deaths),
                "Geheilt: " + toCode(state.recovered)
              ),
            },
            {
              name: "Delta",
              value: multiLine(
                "Fälle: " + toCode(state.delta.cases),
                "Tote: " + toCode(state.delta.deaths),
                "Geheilt: " + toCode(state.delta.recovered)
              ),
            },
          ]);
          responseEmbed.setTitle(
            "Corona in :sparkles:" + state.name + ":sparkles: "
          );
          responseEmbed.setTimestamp(new Date(apiCall.data.meta.lastUpdate));
          message.channel.send(responseEmbed);
        } else {
          message.channel.send("Sorry, das habe ich nicht gefunden!");
        }
      }  else message.reply("Es ist ein Fehler aufgetreten, sorry!");
    } else if (args[1] === "lk") {
      const apiCall = await covidDistricts();
      if (apiCall.ok && apiCall.data) {
        const districtNumber = Object.keys(apiCall.data.data).find((i) =>
          apiCall.data.data[i].name.toLowerCase().includes(args[2])
        );
        if (districtNumber !== undefined) {
          const district = apiCall.data.data[districtNumber];
          const responseEmbed = new Discord.MessageEmbed();

          responseEmbed.addFields([
            {
              name: "Stadt",
              value: multiLine(
                district.name,
                toCode(district.population) + " Einwohner"
              ),
            },
            {
              name: "Inzidenz",
              value: toCode(district.weekIncidence.toFixed(2)),
            },
            {
              name: "Gesamt",
              value: multiLine(
                "Fälle: " + toCode(district.cases),
                "Tote: " + toCode(district.deaths),
                "Geheilt: " + toCode(district.recovered)
              ),
            },
            {
              name: "Delta",
              value: multiLine(
                "Fälle: " + toCode(district.delta.cases),
                "Tote: " + toCode(district.delta.deaths),
                "Geheilt: " + toCode(district.delta.recovered)
              ),
            },
          ]);
          responseEmbed.setTitle(
            "Corona in :sparkles:" + district.name + ":sparkles: "
          );
          responseEmbed.setTimestamp(new Date(apiCall.data.meta.lastUpdate));
          message.channel.send(responseEmbed);
        } else {
          message.channel.send("Sorry, das habe ich nicht gefunden!");
        }
      } else message.reply("Es ist ein Fehler aufgetreten, sorry!");
    } else {
      message.channel.send(
        multiLine(
          "Was laberst du? Gib doch mal " +
            toCode("corona") +
            " ein, um mich zu verstehen",
          "",
          "*sad bot noises*"
        )
      );
    }
  }
});

client.once("ready", () => {
  console.log("Discord Bot ist gestartet!");
  client.user.setPresence({
    activity: { name: "corona", type: "LISTENING" },
  });
});

client.login(process.env.TOKEN);
