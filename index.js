const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("static"));

app.get("/", (_req, res) => {
	res.send({ status: true, msg: "Active!" });
});

app.get("/cdn/:file_name", (req, res) => {
	res.sendFile(`${process.cwd()}/assets/${req.params.file_name}`);
});

app.get("/favicon.ico", (_req, res) => {
	res.sendFile(`${process.cwd()}/assets/wm_logo`);
});

app.get("/data", (_req, res) => {
	const data = Object.assign([], require("./storage.json"));

	res.send({ status: true, data });
});

const PORT = 19161;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));