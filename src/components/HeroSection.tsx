import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text reveal animation on scroll
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.fromTo(words, 
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
    }

    // Hero background parallax
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  const textContent = "Experience the pinnacle of luxury with our curated collection of premium products designed for those who appreciate the finer things in life.";
  const words = textContent.split(" ");

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Redefine
            <motion.span
              className="block bg-gradient-luxury bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Luxury
            </motion.span>
          </motion.h1>

          <motion.p
            ref={textRef}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {words.map((word, index) => (
              <span key={index} className="word inline-block mr-2">
                {word}
              </span>
            ))}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Button variant="luxury" size="xl" className="group">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="elegant" size="xl" className="group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Story
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;