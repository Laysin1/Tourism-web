import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import DestinationDetails from "./DestinationDetails";
import ReviewForm from "./ReviewForm";
import { Button } from "./ui/button";
import { ArrowLeft, Calendar, Edit, MapPin, Star } from "lucide-react";

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from your API
    const fetchDestination = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for demonstration
        const mockDestination = {
          id: "1",
          name: "Tropical Paradise Resort",
          location: "Maldives, Indian Ocean",
          description:
            "Experience the ultimate luxury getaway at this pristine tropical paradise. Crystal clear waters, white sandy beaches, and exclusive overwater bungalows make this destination a dream come true for travelers seeking relaxation and natural beauty.",
          images: [
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
            "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80",
            "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=80",
            "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=1200&q=80",
          ],
          rating: 4.8,
          reviewCount: 124,
          price: "$299/night",
          category: "Beach",
          attractions: [
            {
              id: "a1",
              name: "Coral Reef Diving",
              description:
                "Explore vibrant coral reefs and swim alongside tropical fish in crystal clear waters.",
              image:
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
              rating: 4.9,
              price: "$75",
              category: "Adventure",
            },
            {
              id: "a2",
              name: "Sunset Cruise",
              description:
                "Sail into the sunset on a traditional dhoni boat while enjoying champagne and canapés.",
              image:
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
              rating: 4.7,
              price: "$120",
              category: "Relaxation",
            },
            {
              id: "a3",
              name: "Island Hopping Tour",
              description:
                "Visit multiple islands in one day, experiencing different cultures and landscapes.",
              image:
                "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80",
              rating: 4.6,
              price: "$95",
              category: "Sightseeing",
            },
          ],
          accommodations: [
            {
              id: "acc1",
              name: "Overwater Bungalow",
              description:
                "Luxurious overwater bungalow with direct ocean access and glass floor panels.",
              image:
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
              rating: 4.9,
              price: "$450/night",
              amenities: [
                "Private pool",
                "King bed",
                "Ocean view",
                "Room service",
              ],
            },
            {
              id: "acc2",
              name: "Beach Villa",
              description:
                "Spacious villa located directly on the beach with private terrace and garden.",
              image:
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
              rating: 4.7,
              price: "$350/night",
              amenities: [
                "Beach access",
                "King bed",
                "Outdoor shower",
                "Mini bar",
              ],
            },
            {
              id: "acc3",
              name: "Garden Bungalow",
              description:
                "Cozy bungalow surrounded by tropical gardens and just steps from the beach.",
              image:
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
              rating: 4.5,
              price: "$250/night",
              amenities: [
                "Garden view",
                "Queen bed",
                "Patio",
                "Breakfast included",
              ],
            },
          ],
          reviews: [
            {
              id: "r1",
              author: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              rating: 5,
              date: "June 15, 2023",
              comment:
                "Absolutely breathtaking! The overwater bungalow was a dream come true. Staff was incredibly attentive and the food was amazing. Can't wait to return!",
              images: [
                "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80",
              ],
            },
            {
              id: "r2",
              author: "Michael Chen",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              rating: 4,
              date: "May 3, 2023",
              comment:
                "Beautiful location and excellent service. The only downside was the limited food options for vegetarians. Otherwise, a perfect vacation spot.",
            },
            {
              id: "r3",
              author: "Emma Wilson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
              rating: 5,
              date: "April 22, 2023",
              comment:
                "This place exceeded all expectations! The coral reef diving was incredible and our beach villa was pure luxury. Worth every penny for this once-in-a-lifetime experience.",
              images: [
                "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80",
                "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80",
              ],
            },
          ],
          isFavorite: false,
          availability: [
            { date: "2023-07-15", available: true, price: "$299" },
            { date: "2023-07-16", available: true, price: "$299" },
            { date: "2023-07-17", available: true, price: "$299" },
            { date: "2023-07-18", available: false, price: "$299" },
            { date: "2023-07-19", available: false, price: "$299" },
            { date: "2023-07-20", available: true, price: "$349" },
            { date: "2023-07-21", available: true, price: "$349" },
            { date: "2023-07-22", available: true, price: "$349" },
          ],
          weather: {
            current: {
              temp: 29,
              condition: "Sunny",
              icon: "☀️",
            },
            forecast: [
              { day: "Mon", temp: 29, condition: "Sunny", icon: "☀️" },
              { day: "Tue", temp: 28, condition: "Partly Cloudy", icon: "⛅" },
              { day: "Wed", temp: 27, condition: "Cloudy", icon: "☁️" },
              { day: "Thu", temp: 28, condition: "Sunny", icon: "☀️" },
              { day: "Fri", temp: 29, condition: "Sunny", icon: "☀️" },
            ],
          },
        };

        setDestination(mockDestination);
        setLoading(false);
      } catch (err) {
        setError("Failed to load destination details. Please try again later.");
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    // In a real app, this would update the favorite status in your API
    setDestination((prev) => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }));
  };

  const handleBookNow = () => {
    // In a real app, this would navigate to a booking page or open a booking modal
    console.log("Book now clicked for destination:", id);
    alert("Booking functionality would be implemented here.");
  };

  const handleSubmitReview = (reviewData) => {
    console.log("Review submitted:", reviewData);
    setShowReviewForm(false);
    // In a real app, this would send the review to your API and update the UI
    alert("Thank you for your review!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading destination details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <Button onClick={handleGoBack}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Destinations
        </Button>

        {/* Destination Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {destination.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="h-20 rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
              <p className="text-gray-600 mb-4">
                <span className="inline-flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  {destination.location}
                </span>
              </p>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{destination.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">
                    {destination.reviewCount} reviews
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{destination.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Weather</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current</p>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">
                          {destination.weather.current.icon}
                        </span>
                        <div>
                          <p className="font-bold">
                            {destination.weather.current.temp}°C
                          </p>
                          <p className="text-sm">
                            {destination.weather.current.condition}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      {destination.weather.forecast.map((day, index) => (
                        <div key={index} className="text-center">
                          <p className="text-xs font-medium">{day.day}</p>
                          <p className="text-lg">{day.icon}</p>
                          <p className="text-sm font-medium">{day.temp}°</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1" onClick={handleBookNow}>
                  <Calendar className="mr-2 h-5 w-5" /> Book Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowReviewForm(true)}
                >
                  <Edit className="mr-2 h-5 w-5" /> Write a Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          isOpen={showReviewForm}
          onCancel={() => setShowReviewForm(false)}
          onSubmit={handleSubmitReview}
          destinationName={destination.name}
        />
      )}
    </div>
  );
};

export default DestinationDetailsPage;
