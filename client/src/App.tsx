import axios from "axios";
import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContacts = async () => {
    const {
      data: { contacts },
    } = await axios.get("http://127.0.0.1:5000/contacts");
    console.log(contacts);

    setContacts(contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <h2>Contacts</h2>
      <button onClick={() => setIsModalOpen(true)}>Create new contact</button>
      {isModalOpen ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <ContactForm />
          </div>
        </div>
      ) : null}
      <ContactList contacts={contacts} />
    </>
  );
};

export default App;
