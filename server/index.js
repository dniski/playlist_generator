import express from 'express';
import cors from 'cors';
import generate from './generate.js'
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
    res.send("Hello world from the API");
})

app.post("/generate", async (req, res) => {
    const playlistName = req.body.playlistName;
    const playlistDescription = req.body.playlistDescription;
    const playlistLength = req.body.playlistLength;
    try{
        const playlistResult = await generate(playlistName, playlistDescription, playlistLength);
        res.json({response: playlistResult});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    
})

app.listen(port, () => {
    console.log("listening on port ", port);
});