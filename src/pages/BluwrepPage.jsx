import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const BluwrepPage = () => {
    return (
    <>
    <Helmet>
             <title>Blu-WERP: Next-Gen LLM Preprocessing Pipeline - BluBridge</title>
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
            {/* <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4 text-center" style={{lineHeight: '1.2'}}>
             BLU-WERP
            </h1> */}
            
            <div className='main-inner'>
                <div className="rounded-xl p-8 px-9 shadow-lg border border-gray-200/50 inner-page">
                    
                   
                    <section class="blb-blog-wrapper">
    <div class="blb-blog-container">

        <h1 class="blb-title text-left"> 
            <span style={{display:'block', fontSize:'24px', fontWeight:'600', marginTop:'6px'}}>
                Blu-WERP : Introducing the new State of Art preprocessing pipeline for LLM training
            </span>
        </h1>
<div class="blb-btn-group">
   <Link to="/Research"  class="paper-btn">
    <svg class="paper-icon" xmlns="http://www.w3.org/2000/svg" 
         width="20" height="20" fill="white" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 
        2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
    </svg>
    Read the Paper
    </Link>
  
</div>
        <div class="blb-content">

            <p>
                In today’s rapidly evolving technological landscape, artificial intelligence is no longer just a tool. It is a force actively shaping how individuals work, how industries operate, and even how nations govern. Around the world, governments are beginning to recognize its strategic importance; for example, Albania recently appointed a Minister of State for Artificial Intelligence to oversee public procurement and strengthen anti-corruption efforts.

            </p>
<div className='cont-border'></div>
            <p>
                Yet, the true hero of modern AI isn’t the model itself, it's the data behind it. No matter how advanced a large language model may seem, its capabilities are ultimately limited by the quality, cleanliness, and diversity of the data it is trained on. Every second, millions of new documents, posts, articles, and digital traces are generated worldwide, forming a vast ocean of information with immense economic and societal value. But transforming this raw, noisy data into something meaningful, reliable, and safe for training requires rigorous engineering, careful filtering, and principled design.

            </p>
<div className='cont-border'></div>
            <p>
               In BluBridge, we came up with a Research to have a State of the Art Pipeline and the result of the Research is Blu-WERP arxiv paper, This paper presents Blu-WERP, a novel data preprocessing pipeline designed to optimize the quality of Common Crawl WARC files for LLM training. During the research, We conducted comprehensive evaluations using models with 150M,

            </p>
<div className='cont-border'></div>
            <p>400M, 530M, 750M, and 1B parameters, testing against nine standard benchmarks categorized as World Knowledge & Reasoning (MMLU, ARC-Easy, ARC-Challenge), Language Understanding (HellaSwag, Winogrande), and Commonsense Reasoning (PIQA, SocialIQA, CSQA, OpenBookQA). Results show Blu-WERP consistently achieved superior performance across all model scales. At the 1B parameter scale, Relatively Blu-WERP demonstrates a 4.0% and 9.5% aggregate improvement over DCLM and Fineweb respectively,</p>
<div className='cont-border'></div>
            <p>At BluBridge, we set out to develop a state-of-the-art data preprocessing pipeline tailored for modern LLM training. This effort resulted in Blu-WERP, our newly released arXiv paper, which introduces a novel and highly effective pipeline purpose-built to enhance the quality of Common Crawl WARC files.
</p>
<div className='cont-border'></div>
<p>As part of our research, we conducted extensive evaluations across models with 150M, 400M, 530M, 750M, and 1B parameters, benchmarking performance on nine widely recognized tasks spanning three categories:
</p>


           

            <ul>
                <li><strong>World Knowledge & Reasoning:</strong> MMLU, ARC-Easy, ARC-Challenge</li>
                <li><strong>Language Understanding:</strong> HellaSwag, Winogrande</li>
                <li><strong>Commonsense Reasoning:</strong> PIQA, SocialIQA, CSQA, OpenBookQA</li>
            </ul>

            <p>
               Across all model scales, Blu-WERP consistently delivered superior results. At the 1B parameter scale, Blu-WERP achieved a 4.0% aggregate improvement over DCLM and a 9.5% improvement over FineWeb, demonstrating clear gains in downstream evaluation performance.
            </p>

          
            <div class="blb-figure">
                <img src="/images/figure1.png" alt="Figure 1" />
                <p class="blb-caption">
                     Figure 1 : Aggregate benchmark performance comparison across five datasets. Blu-WERP achieves 53.88% aggregate accuracy, outperforming DCLM (51.81%) and other base lines.
                </p>
            </div>

            

            
            <div class="blb-figure">
                <img src="/images/figure2.png" alt="Figure 2"/>
                <p class="blb-caption">
                   Evaluation results across nine benchmarks from the standardized evaluation suite. Our dataset outperforms all other corpora on the majority of tasks, with competitive results  comparable to DCLM. While performance on MMLU and SocialIQA slightly trails DCLM, our dataset achieves parity in benchmarks assessing world knowledge (MMLU, ARC Easy, ARC Challenge) and demonstrates superior results in language understanding (HellaSwag, SocialIQA) and common-sense reasoning (CSQA, PIQA).
                </p>
                <p>
                    To achieve this results,we had done multiple ablations across multiple components, that contains Parser, Deduplication and Classifier.

                </p>
            </div>

      <div className='cont-border'></div>

            <h2>Parser</h2>

            <p>
                Text extraction marks the first stage in transforming raw Common Crawl HTML data into clean text that can be effectively filtered and deduplicated. To understand its influence on overall pipeline quality, we evaluated four extraction tools: Resiliparse jusText Trafilatura , and the default WET text provided by Common Crawl.

            </p>
<p>A key distinction among these tools lies in how they handle language detection. jusText incorporates a stopword-based filtering mechanism during extraction, which automatically discards pages that lack clear linguistic structure. In contrast, Resiliparse and Trafilatura do not apply such constraints, leading to higher initial text retention immediately after parsing.
</p>
            
            <div class="blb-figure">
                <img src="/images/figure3.png" alt="Figure 3"/>
                <p class="blb-caption">
                   Figure 3: Aggregate benchmark performance across four parser configurations. Jus-text achieves highest aggregate score (0.4474) with 49.96% retention, followed by Trafilatura (0.4429, 43.25% retention), Resiliparse (0.4402, 19.44% retention), and WET baseline (0.4057)

                </p>
            </div>
<div className='cont-border'></div>
          

            <p>
               To increase the overall information richness of our dataset, we apply deduplication using a Bloom Filter–based technique. Web-scale text collections often contain large amounts of repeated or mirrored content, and keeping these duplicates artificially inflates the dataset while adding little real value. Removing them ensures that models encounter a greater variety of unique text within the same token budget, which is known to improve downstream performance.

            </p>
<p>As part of the research, we compared several deduplication approaches, including Bloom Filters, MinHash , and Suffix Array based methods and hybrid tests within them. We also tested different Bloom Filter configurations to identify which variant would be most effective for large-scale corpus cleaning.
</p>

<p>After extensive experimentation, we adopted a deduplication setup that provides the best trade-off between speed and accuracy, ensuring that the final processed corpus maintains high quality without incurring unnecessary computational cost</p>            
            <div class="blb-figure">
                <img src="/images/figure4.png" alt="Figure 4" />
                <p class="blb-caption">
                    Figure 4: Deduplication Ablation tests across Bloom filter Settings with and without the integration of Min-Hash, this shows Bloom-filter Old Both setting has a higher aggregate score of 49.22% followed by the Hybrid method of Exact+Sub-String+Min-Hash.

                </p>
            </div>
<div className='cont-border'></div>
            <h2>Classifier</h2>

            <p>
               Even after applying structural filters and removing repetitive content, a large amount of web text remains that is grammatically correct but lacks real substance or depth. This text is often superficial, promotional, or otherwise low-value despite appearing well-written. To tackle this issue, we add a semantic quality classifier as the final step in our data-processing pipeline. This classifier is trained to separate genuinely informative and educationally valuable documents from generic or low-quality ones. We chose a FastText-based classifier because it is highly efficient at scale and handles the wide vocabulary variation typical of web data extremely well. By using subword information, FastText can generalize robustly across different styles and domains, enabling us to reliably categorize massive volumes of web documents into high-value and low-value groups with minimal computational cost.The semantic classifier complements the earlier filtering stages: while those remove noise, boilerplate, and duplicates, this final classifier focuses on conceptual richness and usefulness. As a result, the curated dataset is not only clean and diverse but also genuinely substantive providing the kind of high-quality content that best supports effective pretraining of language models and strong downstream reasoning capabilities.
            </p>

<div class="blb-figure">
                <img src="/images/figure5.png" alt="Figure 5" />
                <p class="blb-caption">
                   Figure 5: Classifier ablation comparison across four approaches. BETR-based FastText classifier achieves highest aggregate accuracy (0.538), outperforming DeBERTa (0.4948), DCLM-bin fasttext classifier (0.5137), and LLaMA-Score+BERT (0.5128) methods.

                </p>
            </div>
<div className='cont-border'></div>


            <h2>Limitations</h2>

            <h3>Language and domain scope</h3>

            <p>Our evaluation focuses exclusively on English web data and general-purpose benchmarks. Extension to multilingual corpora and domain-specific evaluations (e.g., code, scientific literature) remains unexamined and may require adapted quality classifiers.
            </p>
            <h3>Factual accuracy</h3>
            <p>
Our pipeline does not verify factual correctness of retained documents. While classifier-based filtering prioritizes educational content, it cannot guarantee truthfulness, potentially retaining misinformation present in the original web crawl.
            </p>
            <h3>Next Work</h3>
            <p>At this time, we might beat DCLM in the Benchmark Metrics by 4% relatively, but we are lagging behind them in the data retention and the gap is 33%, we are working on this issue to retain more data by the end of the pipeline and also the data obtained from the pipeline should beat the DCLM and Fineweb in the benchmark Metrics.
</p>

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

export default BluwrepPage