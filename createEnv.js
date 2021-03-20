/* eslint-disable */
const fs = require("fs");
const prompts = require("prompts");

const main = async () => {
  const token = await prompts({
    name: "token",
    type: "password",
    message: "Discord Bot Token",
  });

  fs.writeFileSync(".env", "TOKEN=" + token.token);
};
main();
