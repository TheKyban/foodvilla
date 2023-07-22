import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
	try {
		const { lat, lng } = req.query;
		console.log(req.query);

		const { data} = await axios({
			method: "GET",
			url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`,
			headers: {
				"Access-Control-Allow-Headers":
					"Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET,PUT,POST,DELETE,PATCH,OPTIONS",
				"Content-type": "application/json",
			},
		});
		console.log(data);
	} catch (error) {
		console.log(error);
		res.send("some error");
	}
});
app.listen(7575, () => console.log("server started..."));
