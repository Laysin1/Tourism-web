import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  Users,
  MapPin,
  Star,
  FileText,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

interface Destination {
  id: string;
  name: string;
  location: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  status: "active" | "draft" | "archived";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

interface Review {
  id: string;
  destination: string;
  author: string;
  rating: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: "1",
      name: "Tropical Paradise Resort",
      location: "Maldives, Indian Ocean",
      category: "Beach",
      price: "$299/night",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80",
      status: "active",
    },
    {
      id: "2",
      name: "Alpine Retreat",
      location: "Swiss Alps, Switzerland",
      category: "Mountain",
      price: "$249/night",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
      status: "active",
    },
    {
      id: "3",
      name: "City Skyline Hotel",
      location: "New York, USA",
      category: "City",
      price: "$399/night",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&q=80",
      status: "draft",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "active",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Viewer",
      status: "inactive",
      joinDate: "2023-03-10",
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      destination: "Tropical Paradise Resort",
      author: "Sarah Johnson",
      rating: 5,
      date: "2023-06-15",
      status: "approved",
    },
    {
      id: "2",
      destination: "Alpine Retreat",
      author: "Michael Chen",
      rating: 4,
      date: "2023-05-03",
      status: "approved",
    },
    {
      id: "3",
      destination: "City Skyline Hotel",
      author: "Emma Wilson",
      rating: 3,
      date: "2023-04-22",
      status: "pending",
    },
  ]);

  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dashboard stats
  const stats = [
    {
      title: "Total Destinations",
      value: destinations.length,
      icon: MapPin,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      icon: Users,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Pending Reviews",
      value: reviews.filter((r) => r.status === "pending").length,
      icon: Star,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Total Categories",
      value: 4,
      icon: FileText,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const handleEditDestination = (destination: Destination) => {
    setEditingDestination({ ...destination });
    setActiveTab("edit-destination");
  };

  const handleSaveDestination = () => {
    if (editingDestination) {
      setDestinations(
        destinations.map((d) =>
          d.id === editingDestination.id ? editingDestination : d,
        ),
      );
      setEditingDestination(null);
      setActiveTab("destinations");
    }
  };

  const handleDeleteDestination = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Destinations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {destinations.slice(0, 5).map((destination) => (
                        <TableRow key={destination.id}>
                          <TableCell className="font-medium">
                            {destination.name}
                          </TableCell>
                          <TableCell>{destination.category}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                destination.status === "active"
                                  ? "default"
                                  : destination.status === "draft"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {destination.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destination</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviews.slice(0, 5).map((review) => (
                        <TableRow key={review.id}>
                          <TableCell className="font-medium">
                            {review.destination}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{review.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                review.status === "approved"
                                  ? "default"
                                  : review.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {review.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Destinations Tab */}
          <TabsContent value="destinations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Destinations</h2>
              <Button
                onClick={() => {
                  setEditingDestination({
                    id: `new-${Date.now()}`,
                    name: "",
                    location: "",
                    category: "",
                    price: "",
                    rating: 0,
                    image: "",
                    status: "draft",
                  });
                  setActiveTab("edit-destination");
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Destination
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDestinations.map((destination) => (
                      <TableRow key={destination.id}>
                        <TableCell>
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {destination.name}
                        </TableCell>
                        <TableCell>{destination.location}</TableCell>
                        <TableCell>{destination.category}</TableCell>
                        <TableCell>{destination.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{destination.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              destination.status === "active"
                                ? "default"
                                : destination.status === "draft"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {destination.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditDestination(destination)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleDeleteDestination(destination.id)
                              }
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Edit Destination Tab */}
          <TabsContent value="edit-destination" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingDestination?.id.startsWith("new")
                    ? "Add New Destination"
                    : "Edit Destination"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingDestination && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={editingDestination.name}
                          onChange={(e) =>
                            setEditingDestination({
                              ...editingDestination,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={editingDestination.location}
                          onChange={(e) =>
                            setEditingDestination({
                              ...editingDestination,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={editingDestination.category}
                          onValueChange={(value) =>
                            setEditingDestination({
                              ...editingDestination,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beach">Beach</SelectItem>
                            <SelectItem value="Mountain">Mountain</SelectItem>
                            <SelectItem value="City">City</SelectItem>
                            <SelectItem value="Historical">
                              Historical
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price</label>
                        <Input
                          value={editingDestination.price}
                          onChange={(e) =>
                            setEditingDestination({
                              ...editingDestination,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <Input
                          value={editingDestination.image}
                          onChange={(e) =>
                            setEditingDestination({
                              ...editingDestination,
                              image: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={editingDestination.rating}
                          onChange={(e) =>
                            setEditingDestination({
                              ...editingDestination,
                              rating: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Select
                          value={editingDestination.status}
                          onValueChange={(
                            value: "active" | "draft" | "archived",
                          ) =>
                            setEditingDestination({
                              ...editingDestination,
                              status: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          rows={4}
                          placeholder="Enter destination description"
                        />
                      </div>
                    </div>

                    {editingDestination.image && (
                      <div className="col-span-1 md:col-span-2">
                        <label className="text-sm font-medium block mb-2">
                          Image Preview
                        </label>
                        <div className="border rounded-md p-2 w-full h-48">
                          <img
                            src={editingDestination.image}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingDestination(null);
                      setActiveTab("destinations");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveDestination}>
                    Save Destination
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Users</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active" ? "default" : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Reviews</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Destination</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.destination}
                        </TableCell>
                        <TableCell>{review.author}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{review.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              review.status === "approved"
                                ? "default"
                                : review.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {review.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
