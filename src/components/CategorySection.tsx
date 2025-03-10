import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
  onClick?: () => void;
}

interface CategorySectionProps {
  title?: string;
  description?: string;
  categories?: CategoryProps[];
  onCategoryClick?: (id: string) => void;
}

const CategorySection = ({
  title = "Explore Popular Categories",
  description = "Discover destinations by type and find your perfect getaway",
  categories = [
    {
      id: "beaches",
      name: "Beaches",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      description: "Relax on pristine shores and enjoy crystal clear waters",
      count: 42,
    },
    {
      id: "mountains",
      name: "Mountains",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      description: "Experience breathtaking views and alpine adventures",
      count: 36,
    },
    {
      id: "cities",
      name: "Cities",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
      description: "Explore vibrant urban centers and cultural hotspots",
      count: 28,
    },
    {
      id: "historical",
      name: "Historical",
      image:
        "https://images.unsplash.com/photo-1548668392-d7b557b6d822?w=800&q=80",
      description: "Step back in time with ancient sites and monuments",
      count: 19,
    },
  ],
  onCategoryClick = () => {},
}: CategorySectionProps) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-white/80">
                      {category.count} destinations
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-primary font-medium group-hover:text-primary/80"
                >
                  Explore {category.name}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
