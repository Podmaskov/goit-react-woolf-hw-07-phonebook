import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { getContacts, getLoadingStatus } from '../../redux/contacts/selectors';
import styles from './styles.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getLoadingStatus);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleInputChange = event => {
    const SET_VALUE_MAP = {
      name: setName,
      phone: setPhone,
    };
    const { name, value } = event.target;
    SET_VALUE_MAP[name](value);
  };

  const checkNameDuplicate = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handlerAddContact = event => {
    event.preventDefault();
    if (checkNameDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <form className={styles.form} onSubmit={handlerAddContact}>
      <label className={styles.label}>
        <span className={styles['label-text']}>Name</span>
        <input
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>

      <label className={styles.label}>
        <span className={styles['label-text']}>Phone</span>
        <input
          value={phone}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>

      <button className={styles.btn} type="submit" disabled={isLoading}>
        Add contact
      </button>
    </form>
  );
};
