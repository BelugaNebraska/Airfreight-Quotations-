import {MongoClient} from "mongodb";
import fss from "fs"; //promises;
import path from "path";
//const loading = require("loading-cli");
const fs = fss.promises;
const __dirname = path.resolve();
/**
 * constants
 */
const uri = "mongodb+srv://silviu:sahmat@cluster0.94ixp.mongodb.net/UK_departures?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("turkish").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      db.dropDatabase();
    }


    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "tariffs.json"), "utf8");
    await db.collection("turkish").insertMany(JSON.parse(data));

    
    console.info(
      `Languages collection set up!`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();