import { createContext, useState, useContext, useEffect } from 'react';
import { initializeUsers, getUsers, addUser, updateUser } from '../data/users';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize users if not exists
    initializeUsers();
    
    // Check for logged in user in localStorage
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      const user = getUsers().find(u => u.id === JSON.parse(loggedInUser).id);
      setCurrentUser(user);
    }
    setLoading(false);
  }, [localStorage.getItem('users')]);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    const users = getUsers();
    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = addUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const updateProfile = (data) => {
    if (!currentUser) return { success: false, error: 'No user logged in' };
    
    const updatedUser = updateUser(currentUser.id, data);
    if (updatedUser) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    }
    return { success: false, error: 'Failed to update profile' };
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};