import { writeFileSync, readFileSync } from "fs";

export const restoreDB = () => {
  const cleanDBFilePath = `./data/feed.json`;
  const overwriteDBFilePath = "./data/feed_test.json";

  const data = readFileSync(cleanDBFilePath, "utf-8");
  const parsedData = JSON.parse(data);

  writeFileSync(overwriteDBFilePath, JSON.stringify(parsedData, null, 2));
};
