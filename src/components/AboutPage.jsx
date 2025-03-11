import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
            alt="Travel team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Discover our story and mission to help you explore the world
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, TravelWorld began with a simple mission: to
                make extraordinary travel experiences accessible to everyone.
                What started as a small team of passionate travelers has grown
                into a global community dedicated to helping people discover the
                beauty of our world.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that travel has the power to transform lives, broaden
                perspectives, and create lasting memories. Our platform connects
                travelers with authentic experiences, from pristine beaches to
                mountain retreats and vibrant city centers.
              </p>
              <p className="text-gray-600">
                Every destination on our platform is carefully curated and
                reviewed to ensure it meets our high standards for quality,
                authenticity, and sustainability.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Authenticity</h3>
              <p className="text-gray-600">
                We showcase real destinations with honest reviews to help you
                make informed decisions about your travel experiences.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We promote responsible tourism and partner with destinations
                that prioritize environmental conservation and local
                communities.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of shared experiences and foster a
                community of travelers who inspire and learn from each other.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                bio: "Travel enthusiast with over 15 years of experience in the tourism industry.",
              },
              {
                name: "Michael Chen",
                role: "Chief Experience Officer",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                bio: "Passionate about creating memorable travel experiences for everyone.",
              },
              {
                name: "Emma Wilson",
                role: "Head of Partnerships",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
                bio: "Works with destinations worldwide to bring unique experiences to our platform.",
              },
              {
                name: "David Rodriguez",
                role: "Chief Technology Officer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
                bio: "Tech innovator focused on making travel planning seamless and enjoyable.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered their perfect
            destinations through TravelWorld.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Explore Destinations
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
