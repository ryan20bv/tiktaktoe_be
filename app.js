const express = require("express");
const app = express();
const PORT = process.env.PORT;

// for testing
app.use((req, res, next) => {
	res.send("Hello World 123!");
});

app.listen(PORT, async () => {
	console.log(`Listening to ${PORT}`);
});
