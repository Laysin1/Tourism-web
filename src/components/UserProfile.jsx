import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Heart, MapPin, Calendar, Edit, LogOut } from "lucide-react";
import DestinationCard from "./DestinationCard";

const UserProfile = ({
  user = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "January 2023",
    location: "New York, USA",
    bio: "Avid traveler and photography enthusiast. Always looking for the next adventure!",
  },
  savedDestinations = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      name: "Tropical Paradise",
      location: "Maldives, Indian Ocean",
      rating: 4.9,
      price: "$299/night",
      category: "Beach",
      isFavorite: true,
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
  ],
  reviewedDestinations = [
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80",
      name: "City Skyline",
      location: "New York, USA",
      rating: 4.6,
      price: "$399/night",
      category: "City",
      reviewDate: "March 15, 2023",
      userRating: 5,
      isFavorite: false,
    },
  ],
  onLogout = () => {},
  onEditProfile = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("saved");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-white">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1 text-muted-foreground">
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
                <span className="hidden md:inline mx-2">•</span>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Member since {user.joinDate}</span>
                </div>
              </div>
              <p className="mt-4">{user.bio}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={onEditProfile}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                onClick={onLogout}
                variant="ghost"
                className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Saved Destinations
            <Badge variant="secondary" className="ml-2">
              {savedDestinations.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            My Reviews
            <Badge variant="secondary" className="ml-2">
              {reviewedDestinations.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-0">
          {savedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  image={destination.image}
                  name={destination.name}
                  location={destination.location}
                  rating={destination.rating}
                  price={destination.price}
                  category={destination.category}
                  isFavorite={destination.isFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">No saved destinations yet</h3>
              <p className="text-muted-foreground mt-2">
                Start exploring and save your favorite places
              </p>
              <Button className="mt-4">Explore Destinations</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-0">
          {reviewedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviewedDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {destination.name}
                          </h3>
                          <p className="text-muted-foreground text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {destination.location}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${i < destination.userRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mt-4">
                        Your review from{" "}
                        <span className="font-medium">
                          {destination.reviewDate}
                        </span>
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Edit Review
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Destination
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Edit className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">No reviews yet</h3>
              <p className="text-muted-foreground mt-2">
                Share your experiences by reviewing destinations you've visited
              </p>
              <Button className="mt-4">Write a Review</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
