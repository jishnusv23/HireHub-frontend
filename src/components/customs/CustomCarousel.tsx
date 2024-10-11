import  { useEffect, useState } from "react";
import IMg from "@/assets/home/8hfckftp.png";
import IMg2 from "@/assets/home/img-hero2.png";
import IMg3 from "@/assets/home/A_Recruitment_2x.png";

// Carousel data
const data = [
  {
    image: IMg,
  },
  {
    image: IMg2,
  },
  {
    image: IMg3,
    caption: "Third Slide",
    description: "Description of the third slide goes here.",
  },
];

function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up the interval for auto-sliding
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3-second interval

    // Cleanup interval to prevent memory leaks
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Previous slide control
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // Next slide control
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden pt-8">
      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-96 flex flex-col items-center justify-center bg-gray-200 relative"
          >
            <img
              src={slide.image}
              alt={slide.caption || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {slide.caption && (
              <div className="absolute bottom-10 text-center bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                <h3 className="text-xl font-bold">{slide.caption}</h3>
                {slide.description && <p>{slide.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex space-x-2 justify-center w-full">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;
