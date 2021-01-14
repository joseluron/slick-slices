import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    // Check if it is a number and convert it
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // Copy the existing values
      ...values,
      // Update the new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValues };
}
