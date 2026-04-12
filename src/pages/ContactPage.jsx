import React from 'react';
import { Button } from '../components/ui/Button';

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
      <p className="text-lg text-dark-text mb-10">
        For inquiries, appointments, or support, please fill out the form below.
      </p>

      <form className="text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 bg-surface border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-surface border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-medium mb-2 uppercase tracking-wider">
            Message
          </label>
          <textarea
            id="message"
            rows="6"
            className="w-full px-4 py-3 bg-surface border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
        <div className="text-center">
          <Button type="submit">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
