const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define memeTemplates array with valid template IDs
const memeTemplates = [
  { id: "aag", name: "Dsitracted Boyfrirnd" },
  { id: "bad", name: "Bad Luck Brian" },
  { id: "bongo", name: "Bongo Cat" },
  { id: "buzz", name: "Buzz Lightyear Everywhere" },
  { id: "drake", name: "Drake Hotline Bling" },
  { id: "elmo", name: "Elmo Choosing Cocaine" },
  { id: "exit", name: "Left Exit 12 Off Ramp" },
  { id: "spongebob", name: "Spongebob" },
  { id: "ss", name: "Scumbag Steve" },
  { id: "stop-it", name: "Stop It, Get Some Help" },
  { id: "rollsafe", name: "Roll Safe" },
  { id: "success", name: "Success Kid" },
  { id: "tenguy", name: "10 Guy" },
  { id: "toohigh", name: "The Rent Is Too Damn High" },
  { id: "touch", name: "Principal Skinner" },
  { id: "tried", name: "At Least You Tried" },
  { id: "trump", name: "Donald Trump" },
  { id: "ugandanknuck", name: "Ugandan Knuckles" },
  { id: "vince", name: "Vince McMahon Reaction" },
  { id: "wallet", name: "Patrick Star's Wallet" },
  { id: "waygd", name: "What Are Ya Gonna Do?" },
  { id: "wddth", name: "We Don't Do That Here" },
  { id: "whatyear", name: "What Year Is It?" },
  { id: "winter", name: "Winter is coming" },
  { id: "wkh", name: "Who Killed Hannibal" },
  { id: "worst", name: "The Worst Day Of Your Life So Far" },
  { id: "woman-cat", name: "Woman Yelling at a Cat" },
  { id: "wonka", name: "Condescending Wonka" },
  { id: "xy", name: "X all the Y" },
  { id: "yallgot", name: "Y'all Got Any More of Them" },
  { id: "yodawg", name: "Xzibit Yo Dawg" },
  { id: "yuno", name: "Y U NO Guy" },
  { id: "zero-wing", name: "All Your Base Are Belong to Us" },
  
];

app.post("/api/generateMeme", async (req, res) => {
  const { template, topText, bottomText } = req.body;

  // Check if the provided meme template is valid
  if (!memeTemplates.some((item) => item.id === template)) {
    return res.status(400).json({ error: "Invalid meme template." });
  }

  try {
    const response = await axios.get(
      `https://api.memegen.link/images/${template}/${encodeURIComponent(
        topText
      )}/${encodeURIComponent(bottomText)}.png`,
      { responseType: "arraybuffer" }
    );

    res.set("Content-Type", "image/png");
    res.set("Content-Disposition", 'attachment; filename="generated-meme.png"');
    res.send(response.data);
  } catch (error) {
    console.error("Error generating meme:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the meme." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
