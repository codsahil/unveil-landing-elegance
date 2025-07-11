import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "What makes your products luxury?",
    answer: "Our products are crafted with the finest materials sourced globally, featuring meticulous attention to detail and premium finishes. Each piece undergoes rigorous quality control to ensure it meets our exceptional standards."
  },
  {
    id: 2,
    question: "Do you offer international shipping?",
    answer: "Yes, we provide worldwide shipping with premium packaging and insurance. Delivery times vary by location, typically 3-7 business days for major cities and 7-14 days for remote areas."
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all items in original condition. Returns are free for defective items, and we provide prepaid return labels for your convenience. Custom items may have different return terms."
  },
  {
    id: 4,
    question: "Are your products ethically sourced?",
    answer: "Absolutely. We maintain strict ethical sourcing standards, working only with suppliers who share our commitment to fair labor practices and environmental responsibility. All materials are sustainably sourced when possible."
  },
  {
    id: 5,
    question: "Do you offer customization services?",
    answer: "Yes, we provide bespoke customization for select products. Our design team works closely with clients to create unique pieces tailored to their specifications. Contact our concierge service for more details."
  },
  {
    id: 6,
    question: "How do I care for my luxury items?",
    answer: "Each product comes with detailed care instructions. We also offer professional cleaning and maintenance services for select items. Our customer service team is available to provide personalized care advice."
  }
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-luxury-gray text-lg max-w-2xl mx-auto">
            Find answers to common questions about our luxury products and services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="border-b border-luxury-gray/20 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full py-6 flex items-center justify-between text-left group hover:bg-luxury-gray-light/50 transition-colors px-4 rounded-lg"
                onClick={() => toggleItem(faq.id)}
              >
                <h3 className="text-lg lg:text-xl font-semibold text-luxury-dark group-hover:text-luxury-gold transition-colors pr-4">
                  {faq.question}
                </h3>
                
                <motion.div
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  {openItems.includes(faq.id) ? (
                    <Minus className="h-5 w-5 text-luxury-gold" />
                  ) : (
                    <Plus className="h-5 w-5 text-luxury-gray group-hover:text-luxury-gold transition-colors" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.3 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6">
                      <p className="text-luxury-gray leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-luxury-gray mb-4">
            Still have questions? We're here to help.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center text-luxury-gold font-semibold hover:underline"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Contact our luxury concierge
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;