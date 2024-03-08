import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from '../../redux/filter/selectors';
import { changeFilter } from '../../redux/filter/filterSlice';
import styles from './styles.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handlerFilterChange = event => {
    const { value } = event.target;
    dispatch(changeFilter(value));
  };
  return (
    <label className={styles.label}>
      <span>Fined company by name</span>
      <input
        value={filter}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handlerFilterChange}
      />
    </label>
  );
};
