import React from 'react'
// import ContactForm from './ContactForm'
import ContactInfoSection from "../components/contactform/ContactInfoSection"
import ContactForm from "../components/contactform/ContactForm.jsx"

const ContactUsPage = () => {
  return (<>
    <div className='block lg:hidden mb-[-20px] mt-4'>
      <h1 className="text-3xl text-center mb-6 sm:text-3xl md:text-4xl font-bold gradient-text" style={{lineHeight: '1.2'}}>
        Contact Us
      </h1>
    </div>
    <section className="w-full py-10">
      
      <div className='w-full flex flex-col lg:flex-row gap-10 px-4 md:px-10'>
          <div className='w-full'>
            <ContactInfoSection />
          </div>
          <div className='w-full reb' style= {{ backgroundColor: 'rgb(255, 253, 247)' }}>
              <ContactForm />
          </div>
      </div>
    </section>
  </>)
}

export default ContactUsPage