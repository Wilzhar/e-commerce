import { useState } from 'react';

import './CustomForm.scss';

function CustomForm({ title, subtitle, fields, onSubmit, errorMessage, buttonText, children }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData)
  };

  return (
    <div className="form-container align-left justify-normal">
      <h2 className='mb-4 text-4xl'>{title}</h2>
      <p>{subtitle}</p>
      {errorMessage && <p className="mt-3 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.id]}
              placeholder={field.placeholder}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}
        <button className="w-full base-button" type="submit">{buttonText}</button>
      </form>

      {children}
    </div>
  );
}

export default CustomForm;
