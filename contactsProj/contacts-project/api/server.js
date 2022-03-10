"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/contactsDB");

const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads"));
const contacts = [
	{ firstName: "Jane", lastName: "doe", phoneNumber: "0511781695", image: "contact2.png" },
	{ firstName: "Mario", lastName: "doe", phoneNumber: "0524781695", image: "contact3.png" },
	{ firstName: "July", lastName: "doe", phoneNumber: "0533781695", image: "contact2.png" },
	{ firstName: "Rachet", lastName: "doe", phoneNumber: "0544781695", image: "" },
];

// Contact schema
const contactSchema = mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	image: {
		type: String,
	},
});

const Contact = new mongoose.model("contact", contactSchema);

const john = new Contact({
	firstName: "John",
	lastName: "doe",
	phoneNumber: "0555781695",
	image: "contact1.png",
});

function addData() {
	Contact.insertMany(contacts, (err, docs) => {
		if (err) {
			return console.log(err);
		}

		console.log("saved successfuly", docs);
	});

	john.save();
}
// addData();

app.get("/contacts", async (req, res) => {
	const foundContacts = await Contact.find();
	res.send(foundContacts);
});

app.get("/contacts/:phoneNumber", async (req, res) => {
	const foundContact = await Contact.findOne({ phoneNumber: req.params.phoneNumber });
	if (foundContact) {
		res.sendStatus(400);
	} else {
		res.sendStatus(200);
	}
});

app.post("/contacts", upload.single("file"), (req, res) => {
	const newContact = new Contact(req.body);
	if (req.file) newContact.image = `${req.file.originalname}`;
	newContact.save();
	res.send(req.body);
});

app.delete("/contacts/:id", (req, res) => {
	Contact.findByIdAndDelete(req.params.id, (err, contact) => {
		if (err) {
			console.log(err);
		} else {
			res.sendStatus(200);
		}
	});
});

app.get("/contact/:id", async (req, res) => {
	const foundContact = await Contact.findById(req.params.id);
	console.log(req.params.id);
	res.send(foundContact);
});

app.put("/editContact/:id", async (req, res) => {
	const foundContact = await Contact.findById(req.params.id);
	foundContact.overwrite(req.body);
	foundContact.save();
	res.send("edited");
});

app.listen(3000, () => console.log("Listening on port 3000"));
