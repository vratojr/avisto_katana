import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import { SESSION_SECRET } from "./util/secrets";

import * as gameService from "./services/gameService";
import * as initGameService from "./services/initGameService";
import { game } from "./entities/game";

// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.post("/api/players/add", (req, res) => {
    const player = initGameService.addPlayer(req.body.name);
    res.json(player);
});

app.get("/api/players/:id", (req, res) => {
    const player = gameService.getPlayer(req.params.id);
    res.json(player);
});

app.put("/api/players/:id/draw", (req, res) => {
    res.json(gameService.drawCard(req.params.id));
});

app.put("/api/players/:id/drawDiscarded", (req, res) => {
    res.json(gameService.drawDiscarded(req.params.id));
});

app.put("/api/players/:id/hand/:pos/play", (req, res) => {
    res.json(gameService.playCard(req.params.id, (Number)(req.params.pos)));
});

app.put("/api/players/:id/game/:pos/discard", (req, res) => {
    res.json(gameService.discardCard(req.params.id, (Number)(req.params.pos)));
});

app.put("/api/players/:id/addHonorPoints", (req, res) => {
    res.json(gameService.addHonorPoints(req.params.id, (Number)(req.query.quantity)));
});

app.put("/api/players/:id/addLifePoints", (req, res) => {
    res.json(gameService.addLifePoints(req.params.id, (Number)(req.query.quantity)));
});

app.post("/api/game/endTurn", (req, res) => {
    res.json(gameService.endTurn());
});

app.get("/api/game", (req, res) => {
    res.json(game);
});

app.post("/api/admin/newGame", (req, res) => {
    initGameService.initGame();
    res.json(game);
});

app.post("/api/test/players/add5", (req, res) => {
    ["Simone", "Hannah", "Chiara", "Alice", "Alberto"].forEach(n => {
        initGameService.addPlayer(n);
    });
    res.json(game.players);
});

export default app;
