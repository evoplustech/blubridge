import React from 'react';
import { motion } from 'framer-motion';

const techStackData = [
  {
    title: "Machine Learning Fundamentals",
    items: [
      "Micrograd (Backpropagation & Autograd)",
      "Backpropagation",
      "Micrograd Key Concepts"
    ]
  },
  {
    title: "Bigram Language Model",
    items: [
      "Bigram Representation",
      "Probability Calculation",
      "Model Limitations"
    ]
  },
  {
    title: "Neural Network Models",
    items: [
      "N-gram Model (MLP, MatMul, GELU)",
      "MLP (Multi-Layer Perceptron)",
      "MatMul (Matrix Multiplication)",
      "GELU (Gaussian Error Linear Unit)"
    ]
  },
  {
    title: "Text Tokenization",
    items: [
      "Tokenization (minBPE, Byte Pair Encoding)",
      "Byte Pair Encoding (BPE)",
      "minBPE"
    ]
  },
  {
    title: "Transformer Models",
    items: [
      "Transformer (Residual, LayerNorm, GPT-2)",
      "Residual Connections",
      "LayerNorm",
      "GPT-2"
    ]
  },
  {
    title: "Attention Mechanism",
    items: [
      "Attention (Softmax, Positional Encoding)",
      "Self-Attention",
      "Softmax",
      "Positional Encoding"
    ]
  },
  {
    title: "Optimization & Speed",
    subCategories: [
      {
        title: "Tokenization (minBPE, Byte Pair Encoding)",
        items: ["Weight Initialization", "AdamW"]
      },
      {
        title: "Device (CPU, GPU)",
        items: ["CPUs", "GPUs", "TPUs"]
      },
      {
        title: "Precision (Mixed Precision, FP16, BF16)",
        items: ["FP16 (Half Precision)", "BF16 (Brain Float16)", "FP8"]
      },
      {
        title: "Distributed (DDP, ZeRO)",
        items: ["DDP (Distributed Data Parallel)", "ZeRO (Zero Redundancy Optimizer)"]
      }
    ]
  },
  {
    title: "Datasets & Inference",
    items: [
      "Datasets (Loading, Synthetic Data)",
      "Inference I: KV-Cache (Key-Value Cache)",
      "Inference II: Quantization"
    ]
  },
   {
    title: "Finetuning",
    subCategories: [
      {
        title: "SFT (Supervised Finetuning, PEFT, LoRA)",
        items: ["SFT (Supervised Finetuning)", "PEFT (Parameter Efficient Fine-Tuning)", "LoRA (Low-Rank Adaptation)"]
      },
      {
        title: "RL (RLHF, PPO, DPO)",
        items: ["RLHF (Reinforcement Learning from - Human Feedback)", "PPO (Proximal Policy Optimization)", "DPO (Direct Preference Optimization)"]
      }
    ]
  },
  {
    title: "Multimodal Learning",
    items: [
      "Multimodal (VQVAE, Diffusion Transformer)",
      "VQVAE (Vector Quantized - Variational Autoencoder)",
      "Diffusion Transformer"
    ]
  },
  {
    title: "Deployment",
    items: [
      "Containerization",
      "Model Versioning",
      "Load Balancing"
    ]
  }
];

const TechCard = ({ title, items, subCategories, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay }}
      className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50 h-full flex flex-col"
    >
      <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
      {items && (
        <ul className="space-y-1 text-sm text-gray-700 flex-grow">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-black mr-2 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {subCategories && (
        <div className="space-y-3 mt-2 flex-grow">
          {subCategories.map((sub, subIndex) => (
            <div key={subIndex}>
              <h4 className="text-md font-medium text-gray-800 mb-1">{sub.title}</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {sub.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-gray-500 mr-2 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const TechnologyStack = () => {
  return (
    <section className="px-4 sm:px-6 content-section bg-[#EEEDE9]/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
            Our Research Roadmap
          </h2>
          <p className="text-lg sm:text-l text-gray-600 max-w-3xl mx-auto">
            Drawing from the teachings and workings of many legendary figures whose research is openly available, we will begin our journey with the following:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {techStackData.map((tech, index) => (
            <TechCard 
              key={index} 
              title={tech.title} 
              items={tech.items}
              subCategories={tech.subCategories}
              delay={index * 0.05} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;