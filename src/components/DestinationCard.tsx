import React from "react";
import { Star, MapPin, Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DestinationCardProps {
  id?: string;
  image?: string;
  name?: string;
  location?: string;
  rating?: number;
  price?: string;
  category?: string;
  isFavorite?: boolean;
  onCardClick?: () => void;
  onFavoriteClick?: () => void;
}

const DestinationCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  name = "Beautiful Beach Resort",
  location = "Maldives, Indian Ocean",
  rating = 4.8,
  price = "$299/night",
  category = "Beach",
  isFavorite = false,
  onCardClick = () => {},
  onFavoriteClick = () => {},
}: DestinationCardProps) => {
  return (
    <Card
      className="w-full max-w-[350px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white cursor-pointer group"
      onClick={onCardClick}
    >
      <div className="relative">
        <div className="h-[200px] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
          />
        </Button>
        <Badge
          variant="secondary"
          className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-black font-medium"
        >
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-lg font-bold tracking-tight">{name}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{location}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-muted-foreground">42 reviews</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="font-bold text-primary">{price}</div>
        <Button
          variant="outline"
          size="sm"
          className="group-hover:bg-primary group-hover:text-white"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
