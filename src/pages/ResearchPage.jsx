import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
const ResearchPage = () => {
    return (
    <>
    <Helmet>
            <title>Papers & Publications - BluBridge</title>
    </Helmet>
    <div>
      <a title="Google Analytics Alternative" href="https://clicky.com/101490753"><img style={{display:"none"}} alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" /></a>
<script async data-id="101490753" src="//static.getclicky.com/js"></script>
    <section className="px-1 sm:px-2 mb-14 py-0 mt-2">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            </motion.div>
        
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4 text-center" style={{lineHeight: '1.2'}}>
              Papers & Publications
            </h1>
            
            <div className='main-inner1'>
                <div className="rounded-xl p-8 px-9 shadow-lg border border-gray-200/50 inner-page">
                    
                   
                    <section class="op-research-section">
    <div class="op-container">



    <div class="pulic">      


        <h4 class="op-publication-title">Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets</h4>

        <div class="op-authors">
    <span class="op-auth-icon"></span>
      &nbsp;&nbsp;Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
</div>
       
<div class="op-abstract-box">
    <span class="op-abs-icon"></span>
    Abstract
</div>
        <p class="op-text">Blubridge proudly presents the process behind "Blu-WERP", our pipeline that sets a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we demonstrate training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...<Link to="/Blu-Werp-Blog" className="op-link">More <span style={{letterSpacing:'-3px'}}>>></span></Link></p>


<Link to="https://arxiv.org/abs/2511.18054" class="op-ext-link" target='_blank'>
    <span class="op-ext-icon"></span>
    View on arXiv
</Link>
</div>

    </div>
</section>
                
                    
                 
                   
                   
                </div>
                </div>
        </div>
    </section>

    </div>
    </>
  )
}

export default ResearchPage