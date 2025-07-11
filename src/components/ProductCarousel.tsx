import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

const products = [
  {
    id: 1,
    name: "Golden Elegance Serum",
    price: "₹24,999",
    originalPrice: "₹32,999",
    rating: 4.9,
    reviews: 128,
    image: product1,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Luxury Timepiece",
    price: "₹1,08,999",
    originalPrice: "₹1,32,999",
    rating: 4.8,
    reviews: 89,
    image: product2,
    badge: "Limited Edition"
  },
  {
    id: 3,
    name: "Premium Leather Bag",
    price: "₹74,999",
    originalPrice: "₹99,999",
    rating: 4.9,
    reviews: 156,
    image: product3,
    badge: "New Arrival"
  }
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-dark mb-4">
            Best Selling Products
          </h2>
          <p className="text-luxury-gray text-lg max-w-2xl mx-auto">
            Discover our most coveted pieces, carefully crafted for the discerning connoisseur
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="relative h-[600px] lg:h-[700px] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait" custom={currentIndex}>
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-2xl shadow-premium"
              >
                {/* Product Image */}
                <div className="relative group">
                  <div className="relative h-80 lg:h-full rounded-xl overflow-hidden bg-luxury-gray-light">
                    <img
                      src={products[currentIndex].image}
                      alt={products[currentIndex].name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-luxury text-white px-3 py-1 rounded-full text-sm font-medium">
                      {products[currentIndex].badge}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="elegant"
                        size="icon"
                        onClick={() => toggleFavorite(products[currentIndex].id)}
                        className={`${favorites.includes(products[currentIndex].id) ? 'text-red-500' : ''}`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(products[currentIndex].id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-luxury-dark mb-2">
                      {products[currentIndex].name}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(products[currentIndex].rating) 
                                ? 'text-luxury-gold fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-luxury-gray text-sm ml-2">
                          {products[currentIndex].rating} ({products[currentIndex].reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-luxury-dark">
                        {products[currentIndex].price}
                      </span>
                      <span className="text-luxury-gray line-through text-lg">
                        {products[currentIndex].originalPrice}
                      </span>
                    </div>

                    <p className="text-luxury-gray leading-relaxed">
                      Crafted with precision and attention to detail, this premium piece embodies 
                      luxury and sophistication in every aspect of its design.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="luxury" size="lg" className="group flex-1">
                      <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                    <Button variant="luxury-outline" size="lg">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="elegant"
              size="icon"
              onClick={prevSlide}
              className="hover:scale-110 transition-bounce"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-luxury-gold w-8' 
                      : 'bg-luxury-gray/30 hover:bg-luxury-gray/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="elegant"
              size="icon"
              onClick={nextSlide}
              className="hover:scale-110 transition-bounce"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;