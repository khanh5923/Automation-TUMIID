import fs from "fs";
import path from "path";
import JSON_FILE from "../data/storage.json";

class commonFunctions {
  readJsonFile(fileName) {
    try {
      const filePath = path.resolve(__dirname, "../data/storage.json");
      const data = fs.readFileSync(filePath, "utf-8");
      const storage = JSON.parse(data);
      return storage[fileName];
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return null;
    }
  }

  writeJsonFile(fileName, content) {
    try {
      const filePath = path.resolve(__dirname, "../data/storage.json");
      const data = fs.readFileSync(filePath, "utf-8");
      const storage = JSON.parse(data);
      storage[fileName] = content;
      fs.writeFileSync(filePath, JSON.stringify(storage, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to JSON file:", error);
    }
  }

  updateJsonFile(updates) {
    try {
      const filePath = path.resolve(__dirname, "../data/storage.json");
      const data = fs.readFileSync(filePath, "utf-8");
      const storage = JSON.parse(data);
      // Merge updates with existing data
      const updatedStorage = { ...storage, ...updates };
      fs.writeFileSync(
        filePath,
        JSON.stringify(updatedStorage, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error updating JSON file:", error);
    }
  }

  generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  generateRandomNumber(length) {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  findString(text, findText) {
    return findText.includes(text);
  }

  trimSpaces(str) {
    let text = str.toString();
    return text.trim().replace(/\s+/g, ' ');
  }

  comparisionString(str1, str2) {
    let text1 = this.trimSpaces(str1);
    let text2 = this.trimSpaces(str2);
    return text1.toLowerCase() === text2.toLowerCase();
  }
}
module.exports = new commonFunctions();
// module.exports = {commonFunctions}
