import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Bed,
  Utensils,
  Camera,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react";

interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price?: string;
  category: string;
}

interface Accommodation {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  amenities: string[];
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
}

interface DestinationDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
  destination?: {
    id: string;
    name: string;
    location: string;
    description: string;
    images: string[];
    rating: number;
    reviewCount: number;
    price: string;
    category: string;
    attractions: Attraction[];
    accommodations: Accommodation[];
    reviews: Review[];
    isFavorite: boolean;
  };
  onFavoriteToggle?: () => void;
}

const DestinationDetails = ({
  isOpen = true,
  onClose = () => {},
  destination = {
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
        amenities: ["Private pool", "King bed", "Ocean view", "Room service"],
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
        amenities: ["Beach access", "King bed", "Outdoor shower", "Mini bar"],
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
        amenities: ["Garden view", "Queen bed", "Patio", "Breakfast included"],
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
  },
  onFavoriteToggle = () => {},
}: DestinationDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="sticky top-0 z-10 bg-white pt-6 px-6">
          <DialogHeader className="flex flex-row items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {destination.name}
              </DialogTitle>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{destination.location}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{destination.rating}</span>
                  <span className="ml-1">
                    ({destination.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle();
                }}
              >
                <Heart
                  className={`h-5 w-5 ${destination.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img
                  src={destination.images[activeImageIndex]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {destination.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-[150px] rounded-lg overflow-hidden cursor-pointer ${activeImageIndex === index ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setActiveImageIndex(index)}
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

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  About this destination
                </h3>
                <p className="text-muted-foreground">
                  {destination.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Calendar className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm font-medium">
                      Perfect for weekends
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Users className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm font-medium">Family friendly</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Bed className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm font-medium">
                      Luxury accommodations
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Utensils className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm font-medium">Fine dining</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Price</h3>
                <p className="text-xl font-bold text-primary">
                  {destination.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Prices may vary depending on season and accommodation type
                </p>
              </div>

              <div className="pt-4">
                <Button className="w-full md:w-auto">Book Now</Button>
                <Button
                  variant="outline"
                  className="w-full md:w-auto mt-2 md:mt-0 md:ml-2"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attractions" className="mt-0">
            <h3 className="text-lg font-semibold mb-4">Popular Attractions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.attractions.map((attraction) => (
                <Card key={attraction.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {attraction.name}
                      </CardTitle>
                      <Badge variant="secondary">{attraction.category}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{attraction.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {attraction.description}
                    </p>
                    {attraction.price && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-primary">
                          {attraction.price}
                        </span>
                        <Button size="sm">Book Activity</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accommodations" className="mt-0">
            <h3 className="text-lg font-semibold mb-4">Where to Stay</h3>
            <div className="space-y-6">
              {destination.accommodations.map((accommodation) => (
                <Card key={accommodation.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={accommodation.image}
                        alt={accommodation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                          {accommodation.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">
                            {accommodation.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {accommodation.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                          {accommodation.price}
                        </span>
                        <Button>Check Availability</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Traveler Reviews</h3>
              <Button>Write a Review</Button>
            </div>

            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{destination.rating}</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(destination.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {destination.reviewCount} reviews
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Rating breakdown</div>
                  <div className="space-y-1 mt-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center text-sm">
                        <span className="w-3">{rating}</span>
                        <Star className="h-3 w-3 ml-1 text-yellow-400" />
                        <div className="w-32 h-2 bg-gray-200 rounded-full mx-2">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {rating === 5
                            ? 70
                            : rating === 4
                              ? 20
                              : rating === 3
                                ? 7
                                : rating === 2
                                  ? 2
                                  : 1}
                          %
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {destination.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <div className="text-sm text-muted-foreground">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex mt-3 space-x-2 overflow-x-auto pb-2">
                      {review.images.map((image, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden"
                        >
                          <img
                            src={image}
                            alt="Review"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationDetails;
