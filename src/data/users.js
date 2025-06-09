export const defaultUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "+1234567890",
    dateOfBirth: "1990-01-01",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    bio: "",
    profilePicture: "",
    bookings: [],
    favorites: []
  }
];

// Initialize users from localStorage or use default
export const initializeUsers = () => {
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(storedUsers);
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

// Add new user
export const addUser = (userData) => {
  const users = getUsers();
  const newUser = {
    ...userData,
    id: Date.now().toString(),
    phone: userData.phone || "",
    dateOfBirth: userData.dateOfBirth || "",
    address: userData.address || "",
    city: userData.city || "",
    state: userData.state || "",
    country: userData.country || "",
    zipCode: userData.zipCode || "",
    bio: userData.bio || "",
    profilePicture: userData.profilePicture || "",
    bookings: [],
    favorites: []
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

// Update user
export const updateUser = (userId, userData) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  }
  return null;
};

// Add booking to user
export const addBooking = (userId, booking) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    if (!users[userIndex].bookings) {
      users[userIndex].bookings = [];
    }
    users[userIndex].bookings.push(booking);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id === userId) {
      currentUser.bookings = users[userIndex].bookings;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    return booking;
  }
  return null;
};

// Toggle favorite
export const toggleFavorite = (userId, listingId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    if (!users[userIndex].favorites) {
      users[userIndex].favorites = [];
    }
    const favoriteIndex = users[userIndex].favorites.indexOf(listingId);
    if (favoriteIndex === -1) {
      users[userIndex].favorites.push(listingId);
    } else {
      users[userIndex].favorites.splice(favoriteIndex, 1);
    }
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id === userId) {
      currentUser.favorites = users[userIndex].favorites;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    return users[userIndex].favorites;
  }
  return null;
};