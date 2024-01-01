import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import FilterContacts from './FilterContacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      this.updateStorage
    );
  };
  removeContact = contactId => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => !contactId),
      }),
      this.updateStorage
    );
  };
  handleFilterChange = e => {
    this.setState({ filter: e.target.value }, this.updateStorage);
  };
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  updateStorage() {
    localStorage.removeItem('state');
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  componentDidMount() {
    const state = localStorage.getItem('state');
    if (state) {
      this.setState(JSON.parse(state));
    }
  }
  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <FilterContacts
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onRemoveContact={this.removeContact}
        />
      </div>
    );
  }
}
