import SingleContact from "./components/SingleContact.vue";
import ShowContacts from "./components/ShowContacts.vue";

export default [
	{
		path: "/",
		component: ShowContacts,
	},
	{ path: "/contact/:id", component: SingleContact },
];
