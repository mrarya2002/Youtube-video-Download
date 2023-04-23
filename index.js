const express = require("express");
const ytdl = require("ytdl-core");

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/download", async (req, res) => {
    const url = req.query.link;

    const v_id = ytdl.getURLVideoID(url);

    const info = await ytdl.getInfo(url);

  return res.render("download", {
    url: "https://www.youtube.com/embed/" + v_id,

      info: info.formats.sort((a, b) => {
          return a.mimeType < b.mimeType;
      }),
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
