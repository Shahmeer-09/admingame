// User data structure and types
export const createUser = (data) => ({
  id: data.id || Date.now().toString(),
  email: data.email,
  name: data.name,
  lastLogin: data.lastLogin || null,
  location: data.location || '',
  numberOfReports: data.numberOfReports || 0,
  reportsEmailedSuccessfully: data.reportsEmailedSuccessfully || 0,
  createdAt: data.createdAt || new Date(),
});

export const createAuthState = () => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
});