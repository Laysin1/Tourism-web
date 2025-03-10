import React, { useState } from "react";
import { Grid, Map, List, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import DestinationCard from "./DestinationCard";
import MapView from "./MapView";

interface Destination {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  category: string;
  isFavorite: boolean;
}

interface DestinationGridProps {
  destinations?: Destination[];
  onDestinationSelect?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onFilterChange?: (filters: string[]) => void;
}

const DestinationGrid = ({
  destinations = [
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
  ],
  onDestinationSelect = () => {},
  onToggleFavorite = () => {},
  onFilterChange = () => {},
}: DestinationGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("recommended");

  const toggleFilter = (category: string) => {
    const newFilters = activeFilters.includes(category)
      ? activeFilters.filter((c) => c !== category)
      : [...activeFilters, category];

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDestinationClick = (id: string) => {
    setSelectedDestination(id);
    onDestinationSelect(id);
  };

  const handleFavoriteClick = (id: string) => {
    onToggleFavorite(id);
  };

  const filteredDestinations =
    activeFilters.length > 0
      ? destinations.filter((dest) => activeFilters.includes(dest.category))
      : destinations;

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === "price-low") {
      return (
        parseInt(a.price.replace(/[^0-9]/g, "")) -
        parseInt(b.price.replace(/[^0-9]/g, ""))
      );
    } else if (sortBy === "price-high") {
      return (
        parseInt(b.price.replace(/[^0-9]/g, "")) -
        parseInt(a.price.replace(/[^0-9]/g, ""))
      );
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // Default for "recommended"
  });

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Header with view toggle and filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Explore Destinations</h2>
              <p className="text-muted-foreground">
                {filteredDestinations.length} destinations found
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-md",
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "bg-transparent",
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-md",
                    viewMode === "map"
                      ? "bg-white shadow-sm"
                      : "bg-transparent",
                  )}
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map
                </Button>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort
                </Button>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilters.includes("Beach") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("Beach")}
              className={
                activeFilters.includes("Beach")
                  ? "bg-blue-500 hover:bg-blue-600"
                  : ""
              }
            >
              Beaches
            </Button>
            <Button
              variant={
                activeFilters.includes("Mountain") ? "default" : "outline"
              }
              size="sm"
              onClick={() => toggleFilter("Mountain")}
              className={
                activeFilters.includes("Mountain")
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }
            >
              Mountains
            </Button>
            <Button
              variant={activeFilters.includes("City") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("City")}
              className={
                activeFilters.includes("City")
                  ? "bg-purple-500 hover:bg-purple-600"
                  : ""
              }
            >
              Cities
            </Button>
          </div>

          {/* Content based on view mode */}
          <Tabs value={viewMode} className="w-full">
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedDestinations.map((destination) => (
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
                    onCardClick={() => handleDestinationClick(destination.id)}
                    onFavoriteClick={() => handleFavoriteClick(destination.id)}
                  />
                ))}
              </div>

              {sortedDestinations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Map className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold">
                    No destinations found
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters to find more destinations
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <MapView
                locations={sortedDestinations.map((d) => ({
                  id: d.id,
                  name: d.name,
                  latitude: Math.random() * 80 - 40, // Placeholder random coordinates
                  longitude: Math.random() * 160 - 80, // Placeholder random coordinates
                  category: d.category.toLowerCase(),
                  rating: d.rating,
                }))}
                selectedLocationId={selectedDestination}
                onLocationSelect={handleDestinationClick}
                onViewChange={() => setViewMode("grid")}
              />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationGrid;
