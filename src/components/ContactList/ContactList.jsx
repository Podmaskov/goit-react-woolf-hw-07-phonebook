import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/filter/selectors';
import { getContacts, getLoadingStatus } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import styles from './styles.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsToRender = filteredContacts();
  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <ul className={styles.list}>
      {contactsToRender.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};
