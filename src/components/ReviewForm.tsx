import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Upload, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  rating: z.string().min(1, { message: "Please select a rating" }),
  visitDate: z.string().min(1, { message: "Please select a visit date" }),
  review: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});

interface ReviewFormProps {
  destinationId?: string;
  destinationName?: string;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const ReviewForm = ({
  destinationId = "1",
  destinationName = "Tropical Beach Resort",
  onSubmit = () => {},
  onCancel = () => {},
  isOpen = true,
}: ReviewFormProps) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      rating: "",
      visitDate: "",
      review: "",
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newPhotos]);

      // Create preview URLs for the photos
      const newPreviewUrls = newPhotos.map((photo) =>
        URL.createObjectURL(photo),
      );
      setPhotoPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(photoPreviewUrls[index]);
    setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would handle the photo uploads here as well
    onSubmit({ ...values });
    form.reset();
    setPhotos([]);
    setPhotoPreviewUrls([]);
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full max-w-[600px] mx-auto bg-white">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience at {destinationName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a headline for your review
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">★★★★★ (5) Excellent</SelectItem>
                        <SelectItem value="4">★★★★☆ (4) Very Good</SelectItem>
                        <SelectItem value="3">★★★☆☆ (3) Average</SelectItem>
                        <SelectItem value="2">★★☆☆☆ (2) Poor</SelectItem>
                        <SelectItem value="1">★☆☆☆☆ (1) Terrible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visitDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Visit</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share details of your experience at this destination
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="block mb-2">
                Add Photos (optional)
              </FormLabel>
              <div className="flex flex-wrap gap-2 mb-4">
                {photoPreviewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded overflow-hidden group"
                  >
                    <img
                      src={url}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-0 right-0 bg-black/70 text-white p-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {photos.length < 5 && (
                  <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">
                      Add Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      multiple={photos.length < 4}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                You can upload up to 5 photos. Each photo must be less than 5MB.
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(handleSubmit)}>Submit Review</Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewForm;
