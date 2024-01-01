import React from 'react';

const FilterContacts = ({ value, onChange }) => (
  <>
    <h3>Find contacts by name</h3>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Find contacts by name"
    />
  </>
);
export default FilterContacts;
