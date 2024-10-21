import {DataSource} from "typeorm";
import {Posts} from "./models/Posts";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: 'mongodb://root:root@mongo:27017/project?authSource=admin',
    entities: [Posts]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

// console.log(AppDataSource)
