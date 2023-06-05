const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3003, () => {
      console.log("server is started");
    });
  } catch (e) {
    console.log(e.message);
  }
};
initializeDBAndServer();
    const convertDbObjectToResponseObject = (dbObject) => {
    return {
        playerId: dbObject.player_id,
        playerName: dbObject.player_name,
        jerseyNumber: dbObject.jersey_number,
        role: dbObject.role,
    };
    };

app.get("/players/", async (request, response) =>{
    const getCricketTeam = `SELECT * FROM cricket_team`

    const playerData = await db.all(getCricketTeam);
     playersArray.map((eachPlayer) =>
     convertDbObjectToResponseObject(eachPlayer)
)
);
});
})

app.post("/players/", async (request, response) =>{
    const bodyDetails = request.body;
    const{player_id,playerName,jersey_number,role} = bodyDetails;
    const addDetails = `
    INSERT INTO cricket_team(player_id,playerName,jersey_number,role)
    VALUES(
        ${player_id},
        ${player_name},
        ${jersey_number},
        ${role})
    `
   const addPlayer await db.run(addDetails)
   response.send({
       "playerName" : addPlayer.player_name,
       "jerseyNumber" : addPlayer.jersey_number,
       "role" : addPlayer.role

   });
});


app.get("/players/:playerId/", async (request, response) =>{
    const {player_id} = request.params;

    const getPlayer = `
    SELECT * FROM cricket_team WHERE player_id = ${player_id}` 

    const playerInfo = await db.get(getPlayer);
    response.send({
        playerId: playerInfo.player_id,
        playerName: playerInfo.player_name,
        jerseyNumber: playerInfo.jersey_number,
        role: playerInfo.role;
        })
});

app.put("/players/:playerId/", (request, response)=>{
    const {player_id} = request.params;
    const playerDetails = request.body;
    const{player_id,playerName,jersey_number,role} = bodyDetails;

    const updateQuery  = `
    UPDATE cricket_team SET 
    player_id = ${player_id},
    player_name = ${player_name},
    jersey_number = ${jersey_number},
    role = ${role}
    WHERE player-id = ${player_id}`

    const updatedPlayer = await db.run(updateQuery);
})


app.delete("/players/:playerId/", (request, response) =>{
    const {player_id} = request.params

    const deleteQuery = `
    DELETE FROM cricket_team WHERE player_id = ${player_id}`

    const deleted = await db.run(deleteQuery);
})
module.exports = app


