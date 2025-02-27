import React, { useState } from 'react';

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

const BirthDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<BirthDetails>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const [errors, setErrors] = useState<Partial<BirthDetails>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BirthDetails> = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.timeOfBirth) newErrors.timeOfBirth = 'Time of Birth is required.';
    if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of Birth is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add logic to handle form submission, e.g., API call
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Enter Your Birth Details</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white">
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="timeOfBirth" className="block text-sm font-medium text-white">
          Time of Birth
        </label>
        <input
          type="time"
          id="timeOfBirth"
          name="timeOfBirth"
          value={formData.timeOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
        {errors.timeOfBirth && (
          <p className="text-red-500 text-sm mt-1">{errors.timeOfBirth}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="placeOfBirth" className="block text-sm font-medium text-white">
          Place of Birth
        </label>
        <input
          type="text"
          id="placeOfBirth"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:ring-primary focus:border-primary"
        />
        {errors.placeOfBirth && (
          <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default BirthDetailsForm;
