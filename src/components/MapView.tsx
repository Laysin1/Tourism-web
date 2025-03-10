import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Layers,
  List,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
}

interface MapViewProps {
  locations?: Location[];
  onLocationSelect?: (locationId: string) => void;
  selectedLocationId?: string;
  onViewChange?: () => void;
}

const MapView = ({
  locations = [
    {
      id: "1",
      name: "Tropical Beach Resort",
      latitude: 25.7617,
      longitude: -80.1918,
      category: "beaches",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Mountain Retreat",
      latitude: 39.5501,
      longitude: -105.7821,
      category: "mountains",
      rating: 4.6,
    },
    {
      id: "3",
      name: "Historic City Center",
      latitude: 40.7128,
      longitude: -74.006,
      category: "cities",
      rating: 4.5,
    },
    {
      id: "4",
      name: "Island Paradise",
      latitude: 21.3069,
      longitude: -157.8583,
      category: "beaches",
      rating: 4.9,
    },
    {
      id: "5",
      name: "Alpine Adventure",
      latitude: 46.8182,
      longitude: 8.2275,
      category: "mountains",
      rating: 4.7,
    },
  ],
  onLocationSelect = () => {},
  selectedLocationId = "",
  onViewChange = () => {},
}: MapViewProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [zoom, setZoom] = useState(2);

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const filteredLocations =
    activeFilters.length > 0
      ? locations.filter((location) =>
          activeFilters.includes(location.category),
        )
      : locations;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full h-[700px] bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Map Container */}
      <div className="w-full h-full bg-blue-50 relative">
        {/* Simulated Map Background */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80)`,
          }}
        >
          {/* Map Markers */}
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
                selectedLocationId === location.id
                  ? "z-20 scale-125"
                  : "z-10 hover:scale-110",
              )}
              style={{
                top: `${50 - (location.latitude / 90) * 40 * (zoom / 3)}%`,
                left: `${50 + (location.longitude / 180) * 40 * (zoom / 3)}%`,
              }}
              onClick={() => onLocationSelect(location.id)}
            >
              <div className="relative">
                <MapPin
                  className={cn(
                    "w-8 h-8",
                    location.category === "beaches"
                      ? "text-yellow-500"
                      : location.category === "mountains"
                        ? "text-green-600"
                        : "text-blue-600",
                    selectedLocationId === location.id ? "fill-current" : "",
                  )}
                />
                <div
                  className={cn(
                    "absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap",
                    selectedLocationId === location.id
                      ? "block"
                      : "hidden group-hover:block",
                  )}
                >
                  <p className="font-medium">{location.name}</p>
                  <p className="text-xs">Rating: {location.rating}/5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-3 w-72">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Filter by category:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  activeFilters.includes("beaches") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("beaches")}
                className={
                  activeFilters.includes("beaches")
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : ""
                }
              >
                Beaches
              </Button>
              <Button
                variant={
                  activeFilters.includes("mountains") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("mountains")}
                className={
                  activeFilters.includes("mountains")
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }
              >
                Mountains
              </Button>
              <Button
                variant={
                  activeFilters.includes("cities") ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleFilter("cities")}
                className={
                  activeFilters.includes("cities")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              >
                Cities
              </Button>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white"
            onClick={onViewChange}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <p className="text-sm font-medium mb-2">Map Legend</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-500" />
            <span className="text-xs">Beaches</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-xs">Mountains</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-xs">Cities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
