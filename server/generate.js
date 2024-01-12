import openaiClient from "./api.js"


const generate = async (playlistName, playlistDescription, playlistLength) => {

    const response = await openaiClient.chat.completions.create({
        model : "gpt-3.5-turbo-1106",
        messages : [{
            role: "system",
            content : "You are a helpful assisant that strictly responds in JSON format."
        },
        {
            role: "user",
            content: `generate me an insanely creative list of ${playlistLength} songs base on the playlists name: ${playlistName} and its description: ${playlistDescription}. this list can only be in json format. `
        }
        ],
        temperature: 0.8
    })
    return response.choices[0].message.content;
}
export default generate;