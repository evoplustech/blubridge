import React from 'react'
// import ContactForm from './ContactForm'
import ContactInfoSection from "../components/contactform/ContactInfoSection"
import ContactForm from "../components/contactform/ContactForm.jsx"

const ContactUsPage = () => {
  return (<>
    <div className='flex flex-col max-w-[90%] md:max-w-[70%] lg:flex-row md: lg:max-w-[80%] mx-auto my-12'>
        <div className='w-full lg:w-1/2 flex flex-col lg:mx-4 mx-auto'>
          <ContactInfoSection />
        </div>
        <div className='flex flex-col bg-white rounded-lg mt-12 lg:mt-0 lg:my-0 md:mt-8 sm:mt-8 lg:w-1/2  mx-0 lg:mx-4 md:mx-4 md:my-8 '>
            <ContactForm />
        </div>
    </div>
  </>)
}

export default ContactUsPage