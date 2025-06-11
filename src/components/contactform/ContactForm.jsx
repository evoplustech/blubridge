import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    otp: ''
  });

  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const sendOtp = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError('');

    const templateParams = {
      email: formData.email,
      passcode:otp
    };

    emailjs.send(
      'service_3p1zbq5',
      'template_qu2c6rz',
      templateParams,
      'e6FA_zn9iC7WQhoZ0'
    ).then(() => {
      console.log('OTP sent successfully');
    }).catch((error) => {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    });
  };

  const verifyOtp = () => {
    if (formData.otp === generatedOtp) {
      setOtpVerified(true);
      setError('');
    } else {
      setError('Invalid OTP! Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setError('Please verify the OTP before submitting the form.');
      return;
    }

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      inquiryType: formData.inquiryType,
      message: formData.message
    };

    emailjs.send(
      'service_3p1zbq5',
      'template_wzpppto',
      templateParams,
      'e6FA_zn9iC7WQhoZ0'
    ).then(() => {
      setSuccessMessage('Your message has been sent!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
        otp: ''
      });
      setGeneratedOtp('');
      setOtpSent(false);
      setOtpVerified(false);
    }).catch(() => {
      setError('Failed to send message. Please try again.');
    });
  };

  return (
    <div className="max-w-4xl lg:px-1 md:px-4 mx-4">
      <h2 className="text-center text-3xl font-bold mb-8 pt-12">Contact Us</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2 border-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2 border-gray-400"
            />
          </div>
        </div>

        {/* Email + Verify */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={otpVerified}
              required
              className="w-full border rounded px-4 py-2 border-gray-400"
            />
          </div>
          <button
            type="button"
            onClick={sendOtp}
            disabled={otpVerified}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Verify Email
          </button>
        </div>

        {/* OTP Input */}
        {otpSent && !otpVerified && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block mb-1 font-medium">Enter OTP*</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2 border-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={verifyOtp}
              className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Phone + Inquiry Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Phone No*</label>
            <PhoneInput
              country={'in'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{ name: 'phone', required: true }}
              containerClass="w-full"
              inputStyle={{ width: '100%' }}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Inquiry Type*</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-3"
            >
              <option value="">Select</option>
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">How can we help you?*</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded px-4 py-2 border-gray-400"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 mt-4 mb-8"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
