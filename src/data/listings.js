export const listings = [
  {
    id: 1,
    title: "Luxurious Beach House with Ocean View",
    description: "Experience paradise in this stunning beachfront property with panoramic ocean views. The house features modern amenities, a private pool, and direct beach access.",
    location: "Malibu, California",
    price: 359,
    rating: 4.92,
    reviewCount: 124,
    images: [
      "https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Sarah",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.98,
      superhost: true
    },
    amenities: ["Beachfront", "Private pool", "Kitchen", "Wifi", "Air conditioning", "Free parking", "Washer & dryer", "TV", "BBQ grill"],
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    guests: 6,
    type: "Entire house",
    isFeatured: true
  },
  {
    id: 2,
    title: "Modern Downtown Apartment with City Views",
    description: "Stay in the heart of the city in this sleek, modern apartment with floor-to-ceiling windows offering breathtaking city views. Walking distance to restaurants, shops, and attractions.",
    location: "New York, New York",
    price: 229,
    rating: 4.85,
    reviewCount: 78,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Michael",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.91,
      superhost: true
    },
    amenities: ["City view", "Kitchen", "Wifi", "Air conditioning", "Elevator", "Washer & dryer", "TV", "Gym access"],
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    guests: 2,
    type: "Entire apartment",
    isFeatured: true
  },
  {
    id: 3,
    title: "Charming Cottage in Wine Country",
    description: "Escape to this charming cottage nestled in the heart of wine country. Surrounded by vineyards, this peaceful retreat offers the perfect getaway with wine tasting opportunities nearby.",
    location: "Napa Valley, California",
    price: 275,
    rating: 4.97,
    reviewCount: 103,
    images: [
      "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Emily",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.95,
      superhost: true
    },
    amenities: ["Vineyard view", "Kitchen", "Wifi", "Air conditioning", "Free parking", "Fireplace", "TV", "Patio", "BBQ grill"],
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    guests: 4,
    type: "Entire cottage",
    isFeatured: true
  },
  {
    id: 4,
    title: "Mountain Cabin with Hot Tub",
    description: "Cozy mountain cabin surrounded by pine trees with stunning mountain views. Relax in the private hot tub after a day of hiking or skiing. Perfect for nature lovers.",
    location: "Aspen, Colorado",
    price: 310,
    rating: 4.89,
    reviewCount: 94,
    images: [
      "https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Daniel",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.93,
      superhost: false
    },
    amenities: ["Mountain view", "Hot tub", "Kitchen", "Wifi", "Air conditioning", "Free parking", "Fireplace", "TV", "Deck"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    guests: 5,
    type: "Entire cabin",
    isFeatured: false
  },
  {
    id: 5,
    title: "Tropical Villa with Private Pool",
    description: "Escape to paradise in this luxurious tropical villa with a private infinity pool overlooking the ocean. Surrounded by lush gardens, this villa offers the ultimate relaxation experience.",
    location: "Kauai, Hawaii",
    price: 425,
    rating: 4.96,
    reviewCount: 132,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6186578/pexels-photo-6186578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Olivia",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.99,
      superhost: true
    },
    amenities: ["Beachfront", "Private pool", "Kitchen", "Wifi", "Air conditioning", "Free parking", "Washer & dryer", "TV", "Outdoor shower", "BBQ grill"],
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    guests: 6,
    type: "Entire villa",
    isFeatured: true
  },
  {
    id: 6,
    title: "Historic Brownstone in Cultural District",
    description: "Stay in this beautifully restored historic brownstone in the heart of the cultural district. Experience the charm of old architecture with modern amenities and comfort.",
    location: "Boston, Massachusetts",
    price: 285,
    rating: 4.87,
    reviewCount: 82,
    images: [
      "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2079266/pexels-photo-2079266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    host: {
      name: "Robert",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4.90,
      superhost: false
    },
    amenities: ["Historic building", "Kitchen", "Wifi", "Air conditioning", "Washer & dryer", "TV", "Backyard", "BBQ grill"],
    bedrooms: 2,
    beds: 3,
    bathrooms: 1.5,
    guests: 5,
    type: "Entire townhouse",
    isFeatured: false
  }
];