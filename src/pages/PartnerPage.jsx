import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PartnerPage = () => {
  return (
    <div>

   <section className="px-4 sm:px-6 flex items-center pt-3 pb-3">
           <div className="max-w-7xl mx-auto text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="hero-glow rounded-3xl p-2 py-0 sm:p-1 sm:pb-0" 
             >
               <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-6 gradient-text" style={{lineHeight: '1.2'}}>  
                Partner With Us
               </h1>
             </motion.div>
           </div>
       </section>
       <section className="px-1 sm:px-2 mb-14 py-0">
           <div className="max-w-7xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.6 }}
               className="text-center"
             >
               </motion.div>
                   <div className="bg-white/60 rounded-xl p-8 px-9 shadow-lg border border-gray-200/50 inner-page">
                  
                       <p className='inner-content'>
                         We’re eager to collaborate and welcome opportunities for partnership. If you’re a like-minded organization, AI laboratory, researcher, or scientist or if you work in a related field and you’re interested in joining forces, sharing resources, or collaborating on research, learning, and development, we’d be delighted to connect with you.
                       </p>
                       <h2 className='text-xl font-bold pt-3 underline mt-6'>Get in Touch:</h2>
                       <ul className='models'>
                         <li><strong>Contact Number:</strong> 044-4501 2277</li>
                         <li><strong>Email:</strong> research.1@blubridge.com</li>
                         <li><strong>X (Twitter): </strong><a className='underline' href='https://x.com/BlubridgeAI'>https://x.com/BlubridgeAI</a></li>
                       </ul>
                        <div className='mt-8'>
                          <p>Prefer to drop us a message?&nbsp;
                            <strong>
                              <span className='text-blue-600 underline'>
                                <Link to='/Contact'>Click here</Link>
                              </span>
                            </strong>
                          </p>
                        </div>
                   </div>
           </div>
       </section>

    </div>
  )
}

export default PartnerPage