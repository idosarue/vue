"use strict";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/contactsDB");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const contacts = [
	{ firstName: "Jane", lastName: "doe", phoneNumber: "0526781695", image: "src/assets/contact2.png" },
	{ firstName: "Mario", lastName: "doe", phoneNumber: "0524781695", image: "src/assets/contact3.png" },
	{ firstName: "July", lastName: "doe", phoneNumber: "0526781695", image: "src/assets/contact2.png" },
	{ firstName: "Rachet", lastName: "doe", phoneNumber: "0524781695", image: "" },
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
	phoneNumber: "0525781695",
	image: "src/assets/contact1.png",
});

// Contact.insertMany(contacts, (err, docs) => {
// 	if (err) {
// 		return console.log(err);
// 	}

// 	console.log("saved successfuly", docs);
// });

// john.save();

app.get("/contacts", async (req, res) => {
	const foundContacts = await Contact.find();
	res.send(foundContacts);
});

app.post("/contacts", (req, res) => {
	const newContact = new Contact(req.body);
	newContact.save();
	res.send(req.body);
});

app.listen(3000, () => console.log("Listening on port 3000"));
