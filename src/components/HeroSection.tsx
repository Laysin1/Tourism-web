import React, { useState } from "react";
import { Search, MapPin, Calendar, DollarSign, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  backgroundImages?: string[];
  headline?: string;
  subheadline?: string;
  onSearch?: (searchParams: any) => void;
}

const HeroSection = ({
  backgroundImages = [
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
  ],
  headline = "Discover Your Perfect Destination",
  subheadline = "Explore breathtaking locations and create unforgettable memories",
  onSearch = () => {},
}: HeroSectionProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useState({
    destination: "",
    region: "",
    dates: "",
    budget: "",
    activities: "",
  });

  // Change background image every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchParams);
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image Carousel */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === activeImageIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
          <img
            src={image}
            alt={`Destination background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          {headline}
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">{subheadline}</p>

        {/* Search Box */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="filter">Advanced Filters</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where do you want to go?"
                    className="pl-10 bg-white/80 border-0 h-12 text-gray-900"
                    value={searchParams.destination}
                    onChange={(e) =>
                      handleInputChange("destination", e.target.value)
                    }
                  />
                </div>
                <Button
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="filter" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">
                    Region
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("region", value)
                      }
                      value={searchParams.region}
                    >
                      <SelectTrigger className="pl-10 bg-white/80 border-0 h-12 text-gray-900">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="north-america">
                          North America
                        </SelectItem>
                        <SelectItem value="south-america">
                          South America
                        </SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="oceania">Oceania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">
                    Dates
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="When are you traveling?"
                      className="pl-10 bg-white/80 border-0 h-12 text-gray-900"
                      value={searchParams.dates}
                      onChange={(e) =>
                        handleInputChange("dates", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">
                    Budget
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("budget", value)
                      }
                      value={searchParams.budget}
                    >
                      <SelectTrigger className="pl-10 bg-white/80 border-0 h-12 text-gray-900">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">
                    Activities
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("activities", value)
                      }
                      value={searchParams.activities}
                    >
                      <SelectTrigger className="pl-10 bg-white/80 border-0 h-12 text-gray-900">
                        <SelectValue placeholder="Select activities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="nightlife">Nightlife</SelectItem>
                        <SelectItem value="family">Family-friendly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSearch}
                >
                  Apply Filters
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === activeImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70",
              )}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View destination image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
