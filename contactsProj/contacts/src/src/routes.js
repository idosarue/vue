import SingleContact from "./components/SingleContact.vue";
import ShowContacts from "./components/ShowContacts.vue";

export default [
	{ path: "/contact/:id", component: SingleContact },
	{ path: "/contacts", component: ShowContacts },
];
