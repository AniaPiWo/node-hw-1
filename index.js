const { Command } = require("commander");
const colors = require("colors"); // Importuj bibliotekę colors

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  const contacts = require("./contacts");

  switch (action) {
    case "list":
      contacts
        .listContacts()
        .then((contacts) => {
          console.table(contacts);
        })
        .catch((error) => {
          console.error("Error:".red, error);
        });
      break;

    case "get":
      if (!id) {
        console.error("Error:".red, "ID is required for get action");
        return;
      }
      contacts
        .getContactById(id)
        .then((contact) => {
          console.log(contact);
        })
        .catch((error) => {
          console.error("Error:".red, error);
        });
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error(
          "Error:".red,
          "Name, email, and phone are required for add action"
        );
        return;
      }
      contacts
        .addContact(name, email, phone)
        .then(() => {
          console.log("Contact has been added successfully.".green);
        })
        .catch((error) => {
          console.error("Error adding contact:".red, error);
        });
      break;

    case "remove":
      if (!id) {
        console.error("Error:".red, "ID is required for remove action");
        return;
      }
      contacts
        .removeContact(id)
        .then(() => {
          console.log("Contact has been deleted successfully.".green);
        })
        .catch((error) => {
          console.error("Error:".red, error);
        });
      break;

    default:
      console.warn("Unknown action type!".yellow);
  }
}

invokeAction(argv);
