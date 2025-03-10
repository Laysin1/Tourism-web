import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import DestinationGrid from "./DestinationGrid";
import DestinationDetails from "./DestinationDetails";
import AuthModal from "./AuthModal";
import ReviewForm from "./ReviewForm";
import Footer from "./Footer";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null,
  );
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample destinations data
  const destinations = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      name: "Tropical Paradise",
      location: "Maldives, Indian Ocean",
      rating: 4.9,
      price: "$299/night",
      category: "Beach",
      isFavorite: false,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      name: "Alpine Retreat",
      location: "Swiss Alps, Switzerland",
      rating: 4.7,
      price: "$249/night",
      category: "Mountain",
      isFavorite: true,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80",
      name: "City Skyline",
      location: "New York, USA",
      rating: 4.6,
      price: "$399/night",
      category: "City",
      isFavorite: false,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1520483601560-389dff434fdf?w=800&q=80",
      name: "Coastal Villa",
      location: "Amalfi Coast, Italy",
      rating: 4.8,
      price: "$349/night",
      category: "Beach",
      isFavorite: false,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
      name: "Mountain Lodge",
      location: "Rocky Mountains, Canada",
      rating: 4.5,
      price: "$199/night",
      category: "Mountain",
      isFavorite: false,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
      name: "Urban Loft",
      location: "Tokyo, Japan",
      rating: 4.7,
      price: "$279/night",
      category: "City",
      isFavorite: true,
    },
  ];

  // Handle login/signup
  const handleLoginClick = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would authenticate with a backend
    console.log("Login attempt with:", email, password);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // In a real app, this would register a new user
    console.log("Signup attempt with:", email, password, name);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Handle destination selection
  const handleDestinationSelect = (id: string) => {
    setSelectedDestination(id);
  };

  // Handle search
  const handleSearch = (searchParams: any) => {
    console.log("Search with params:", searchParams);
    // In a real app, this would filter destinations
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    // In a real app, this would filter destinations by category
  };

  // Handle favorite toggle
  const handleToggleFavorite = (id: string) => {
    console.log("Toggle favorite for:", id);
    // In a real app, this would update the user's favorites
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onLogoutClick={handleLogout}
      />

      <main>
        <HeroSection onSearch={handleSearch} />

        <CategorySection onCategoryClick={handleCategoryClick} />

        <DestinationGrid
          destinations={destinations}
          onDestinationSelect={handleDestinationSelect}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      <Footer />

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authModalTab}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}

      {selectedDestination && (
        <DestinationDetails
          isOpen={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
          destination={{
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
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
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
          }}
          onFavoriteToggle={() => console.log("Toggle favorite")}
        />
      )}

      {showReviewForm && (
        <ReviewForm
          isOpen={showReviewForm}
          onCancel={() => setShowReviewForm(false)}
          onSubmit={(data) => {
            console.log("Review submitted:", data);
            setShowReviewForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
