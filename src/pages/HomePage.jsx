import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import StatCard from '@/components/StatCard';
import TechnologyStack from '@/components/TechnologyStack';
import { Brain, Zap, Database, Users, ArrowRight, Play, CheckCircle, Lightbulb, BarChart, ShieldCheck, Rocket,Bot,FileAudio,FileImageIcon} from 'lucide-react';

const HomePage = () => {
  return (
    <main className="relative z-10">
      <section className="px-4 sm:px-6 flex items-center pt-4 pb-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-glow rounded-3xl p-2 py-0 sm:p-1 sm:pb-0" 
          >
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold gradient-text" style={{lineHeight: '1.2'}}>
              BluBridge
            </h1>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base sm:text-lg">
                Explore Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-base sm:text-lg border-black text-black hover:bg-black hover:text-white">
                <Play className="mr-2 w-5 h-5" />
                Request Demo
              </Button>
            </div> */}
          </motion.div>
          
         {/* <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <StatCard number="1000+" label="AI Models Deployed" delay={0.3} />
            <StatCard number="2PB+" label="Data Processed Daily" delay={0.5} />
            <StatCard number="40%" label="Avg. Efficiency Gain" delay={0.7} />
            <StatCard number="24/7" label="Expert Support" delay={0.9} />
          </div> */}
        </div>
      </section>

      <section className="px-4 sm:px-6 content-section py-0">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
              Why BluBridge AI?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of our unified AI platform, designed for performance, scalability, and ease of use.
            </p> */}
            </motion.div>

                <div className="bg-white/60 rounded-xl p-6 shadow-lg border border-gray-200/50">
                 <strong className='dated'>Dated : 18<sup>th</sup> February, 2025</strong>
                    <p className='we-are'>We are an aspiring Large Language Model (LLM) research company founded on 15<sup>th</sup> February 2025. The scope of research, we wish to undertake is into the following disciplines:</p>
                    <ul className='models'>
                      <li>Understanding Foundation Models</li>
                      <li>Creating, Testing & Implementing Models</li>
                    </ul>
                    <p className='dedi'>We are dedicated to advancing tokenisation and prediction modelling across three key areas:-</p>
                    <ul className='models'>
                      <li>Chatbots</li>
                      <li>Audio</li>
                      <li>Images</li>
                    </ul>
                </div>


          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 bg-white/60 rounded-xl p-6 shadow-lg border border-gray-200/50">
             <div className="grid-item p-6 h-full flex flex-col pr-0 ">
                <p className='we-are'>We are an aspiring Large Language Model (LLM) research company founded on 15<sup>th</sup> February 2025. The scope of research, we wish to undertake is into the following disciplines:</p>
             </div>
             <div className="grid-item bg-[#f3f1e9] backdrop-blur-md p-7 pb-0 rounded-xl border border-gray-300/50 h-full flex flex-col">   
                <h3 class="text-xl font-semibold mb-2 text-gray-900">Understanding Foundation Models</h3><p class="text-gray-600 leading-relaxed">Foundation models are large AI systems trained on vast datasets, adaptable across multiple tasks and applications as building blocks.</p>
             </div>
             <div className="grid-item bg-[#f3f1e9] backdrop-blur-md p-6 rounded-xl border border-gray-300/50 h-full flex flex-col">
                 <h3 class="text-xl font-semibold mb-2 text-gray-900">Creating, Testing & Implementing Models</h3><p class="text-gray-600 leading-relaxed">Creating, testing and implementing models involves problem definition, data collection, model design, deployment, and monitoring stages. </p>
             </div>
       
   
 


            <FeatureCard
              icon={Lightbulb}
              title="Innovative Solutions"
              description="Access cutting-edge AI models and tools to solve complex business challenges and drive innovation."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart}
              title="Actionable Insights"
              description="Transform raw data into clear, actionable insights that inform strategic decision-making."
              delay={0.2}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Robust Security"
              description="Ensure data integrity and compliance with enterprise-grade security features and protocols."
              delay={0.3}
            />
            <FeatureCard
              icon={Rocket}
              title="Scalable Infrastructure"
              description="Effortlessly scale your AI operations with our flexible and powerful cloud-based infrastructure."
              delay={0.4}
            />
            <FeatureCard
              icon={Zap}
              title="Rapid Deployment"
              description="Accelerate your time-to-market with streamlined workflows and rapid model deployment capabilities."
              delay={0.5}
            />
            <FeatureCard
              icon={Users}
              title="Collaborative Environment"
              description="Foster teamwork and enhance productivity with a shared workspace for data scientists and developers."
              delay={0.6}
            /> 
          </div> */}
        </div>
      </section>


      

     <TechnologyStack />
       <section className="content-section desksec">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4 sm:mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
                Our Research Roadmap
              </h2>
              <p className="text-lg sm:text-l text-gray-600 max-w-3xl mx-auto">
                Drawing from the teachings and workings of many legendary figures whose research is openly available, we will begin our journey with the following:
              </p>
            </motion.div>
          <img src="/images/roadmap.png" alt="Research Roadmap" className="w-full h-auto rounded-lg " />
            </div>
          </section>
      
      

      <section className="px-4 sm:px-6 content-section-tight mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200/40"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-black">
            Create the future of AI—responsibly.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
           Be part of a team redefining AI with a focus on safety, responsibility, and long-term progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base sm:text-lg">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base sm:text-lg border-black text-black hover:bg-black hover:text-white">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default HomePage;