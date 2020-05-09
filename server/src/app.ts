import "module-alias/register"; // https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353
import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import * as testService from "./services/testService";
import * as wss from "./services/websocketService"
import { game } from "@shared/entities/game";

// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 4000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
    next();
});

wss.init();

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.post("/api/test/players/add5", (req, res) => {
    testService.add5Players();
    res.json(game.players);
    wss.signalGameUpdated()
});

app.post("/api/test/emptyGameDeck", (req, res) => {
    testService.emptyGameDeck();
    res.json(game.players);
    wss.signalGameUpdated()
});

export default app;
