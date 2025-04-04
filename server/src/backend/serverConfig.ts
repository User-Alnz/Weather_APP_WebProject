import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./router.js";
import { fileURLToPath } from "url";
import path from "path";
import { errorHandler } from "./errors/errors.js";


//https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188 Good practice setting helper Doc
const server = express();

/* Setting CORS */

    if (!process.env.CLIENT_URL)
        throw new Error('CLIENT_URL is missing from .env file');
        
    server.use(cors({
        origin: [process.env.CLIENT_URL as string], // Define origins allowed to listen requests
        methods: 'GET,POST', // These  Define http methods allowed
        //allowedHeaders: ['Content-Type', 'Authorization'] // Allow only certain request headers
    }));


/* Setting middleware accepted format by server */

    server.use(express.json()); //json format data
    //server.use(express.urlencoded()); //url data encoded like in body POST http method
    //server.use(express.text()); //text data
    //server.use(express.raw()); //binary data

/* Serve file or app from client */

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pathApp1 = path.join(__dirname, "../../../client/1-Html_Directory/"); //Define which dist/app or file to serve from client
    console.info("Serving file from pathApp1 :", pathApp1);
    server.use("/app1", express.static( pathApp1, {index: "UI_Weatherapp_landscape.html"}));

    const pathApp1CSS = path.join(__dirname, "../../../client/2-CSS_Directory/");
    server.use("/css", express.static(pathApp1CSS));

    const pathApp1JS = path.join(__dirname, "../../../client/3-JS_Directory/");
    server.use("/js", express.static(pathApp1JS));

    const PathToJsonCode = path.join(__dirname, "../../../WMO_Weather_Codes/");
    server.use("/WMO_Weather_Codes/", express.static(PathToJsonCode));

    const PathToImages = path.join(__dirname, "../../../Images_source/");
    server.use("/Images_source/", express.static(PathToImages));
    
/* Rooting */

    server.use(router);

/* Error handling */

    server.use(errorHandler);


export default server;