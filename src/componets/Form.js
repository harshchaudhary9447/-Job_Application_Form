import React, { useEffect, useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [options, setOptions] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [interviewTime, setInterviewTime] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  function handleOptions(e) {
    setOptions(e.target.value);
  }

  useEffect(() => {
    console.log('Selected option:', options);
  }, [options]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setAdditionalInfo(prev =>
      checked ? [...prev, value] : prev.filter(info => info !== value)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone || isNaN(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if ((options === 'Developer' || options === 'Designer') && (!experience || experience <= 0)) {
      newErrors.experience = 'Please enter a valid experience greater than 0.';
    }
    if (!interviewTime) {
      newErrors.interviewTime = 'Please select a preferred interview time.';
    }
    if (additionalInfo.length === 0) {
      newErrors.additionalInfo = 'Please select at least one skill.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const data = {
      name,
      phone,
      email,
      position: options,
      experience,
      portfolio: options === 'Designer' ? portfolio : 'N/A',
      additionalInfo,
      interviewTime
    };
    setSubmittedData(data);
    setErrors({});
  };

  return (
    <div>
      <form className="mt-10 max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label className='block text-base font-medium text-gray-900' htmlFor="name">Your full Name</label>
          <input 
            className='w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg' 
            type='text' 
            placeholder='Harsh' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-5'>
          <label className='block text-base font-medium text-gray-900' htmlFor="phone">Your Phone Number</label>
          <input 
            className='w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg' 
            type='number' 
            placeholder='+9520 691965' 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
          <input 
            type="email" 
            id="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="name@flowbite.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <label htmlFor="pos" className="block mb-2 text-base font-medium">Applying for Position</label>
        <select 
          id="pos" 
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
          value={options}
          onChange={handleOptions}
          required
        >
          <option value="" disabled>Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {(options === 'Developer' || options === 'Designer') && (
          <div className="mb-5 mt-3">
            <label htmlFor="experience" className="block mb-2 text-base font-medium text-gray-900">
              Relevant Experience
            </label>
            <input 
              type="number" 
              id="experience" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required 
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
          </div>
        )}
        {options === 'Designer' && (
          <div className="mb-5 mt-3">
            <label htmlFor="portfolio" className="block mb-2 text-base font-medium text-gray-900">Portfolio URL</label>
            <input 
              type="text" 
              id="portfolio" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              required 
            />
          </div>
        )}

        <fieldset className="mt-4">
          <legend className="block text-base font-medium text-gray-900">Additional information</legend>
          <div className="flex items-center mb-4 mt-3">
            <input 
              id="country-option-1" 
              type="checkbox" 
              name="info" 
              value="javascript" 
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
              onChange={handleCheckboxChange}
            />
            <label htmlFor="country-option-1" className="block ms-2 text-sm font-medium text-gray-500">Javascript</label>
          </div>
          <div className="flex items-center mb-4">
            <input 
              id="option-2" 
              type="checkbox" 
              name="info" 
              value="html" 
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              onChange={handleCheckboxChange} 
            />
            <label htmlFor="option-2" className="block ms-2 text-sm font-medium text-gray-500">HTML</label>
          </div>
          <div className="flex items-center mb-4">
            <input 
              id="option-3" 
              type="checkbox" 
              name="info" 
              value="css" 
              className="w-4 h-4 border-gray-300 focus:ring-2"
              onChange={handleCheckboxChange} 
            />
            <label htmlFor="option-3" className="block ms-2 text-sm font-medium text-gray-500">CSS</label>
          </div>
          {errors.additionalInfo && <p className="text-red-500 text-sm">{errors.additionalInfo}</p>}
        </fieldset>

        <div className="mb-5">
          <label htmlFor="time" className="block mb-2 text-base font-medium text-gray-900">Preferred Interview Time</label>
          <input 
            type="datetime-local" 
            id="time" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            required 
          />
          {errors.interviewTime && <p className="text-red-500 text-sm">{errors.interviewTime}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2.5 rounded-lg"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-10 max-w-sm mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Form Submission Summary</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          <p><strong>Experience:</strong> {submittedData.experience}</p>
          {submittedData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolio}</p>
          )}
          <p><strong>Additional Skills:</strong> {submittedData.additionalInfo.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
