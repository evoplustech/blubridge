import React from 'react'
// import ContactForm from './ContactForm'
import ContactInfoSection from "../components/contactform/ContactInfoSection"
import ContactForm from "../components/contactform/ContactForm.jsx"

const ContactUsPage = () => {
  return (<>
    <div className='block lg:hidden mb-[-20px] mt-4'>
      <h1 className="text-3xl text-center mb-8 sm:text-3xl md:text-4xl font-bold gradient-text" style={{lineHeight: '1.2'}}>
        Contact Us
      </h1>
    </div>
    <section className="px-4 sm:px-6 flex items-center pt-3 pb-3">
      
      <div className='flex flex-col max-w-[76%] md:max-w-[66%] lg:flex-row md: lg:max-w-[76%] mx-auto mt-4 mb-12'>
          <div className='w-full lg:w-1/2 flex flex-col lg:mx-4 mx-auto'>
            <ContactInfoSection />
          </div>
          <div className='flex flex-col rounded-lg mt-12 lg:mt-0 lg:my-0 md:mt-8 sm:mt-8 lg:w-1/2  mx-0 lg:mx-4 md:mx-4 md:my-8 z-0 ' style= {{ backgroundColor: 'rgb(255, 253, 247)' }}>
              <ContactForm />
          </div>
      </div>
    </section>
  </>)
}

export default ContactUsPage