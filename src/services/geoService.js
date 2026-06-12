import API from './api';

export const geoService = {
  // === DIVISIONS ===
  getDivisions: () => API.get('/divisions'),
  getDivisionBySlug: (slug) => API.get(`/divisions/${slug}`),
  createDivision: (data) => API.post('/divisions', data),
  updateDivision: (slug, data) => API.put(`/divisions/${slug}`, data),
  deleteDivision: (slug) => API.delete(`/divisions/${slug}`),
  getDistrictsByDivision: (slug) => API.get(`/divisions/${slug}/districts`),

  // === DISTRICTS ===
  getDistricts: () => API.get('/districts'),
  getDistrictBySlug: (slug) => API.get(`/districts/${slug}`),
  createDistrict: (data) => API.post('/districts', data),
  updateDistrict: (slug, data) => API.put(`/districts/${slug}`, data),
  deleteDistrict: (slug) => API.delete(`/districts/${slug}`),
  getTalukasByDistrict: (slug) => API.get(`/districts/${slug}/talukas`),

  // === TALUKAS ===
  getTalukas: () => API.get('/talukas'),
  getTalukaBySlug: (slug) => API.get(`/talukas/${slug}`),
  createTaluka: (data) => API.post('/talukas', data),
  updateTaluka: (slug, data) => API.put(`/talukas/${slug}`, data),
  deleteTaluka: (slug) => API.delete(`/talukas/${slug}`),

  // === HIERARCHY LEAF ENTITIES ===
  getVillagesByTaluka: (slug) => API.get(`/talukas/${slug}/villages`),
  getCitiesByTaluka: (slug) => API.get(`/talukas/${slug}/cities`),
  getTownsByTaluka: (slug) => API.get(`/talukas/${slug}/towns`),

  // Add these inside geoService.js if they are missing:
getCityBySlug: (slug) => API.get(`/cities/${slug}`),
createCity: (data) => API.post('/cities', data),
updateCity: (slug, data) => API.put(`/cities/${slug}`, data),

getTownBySlug: (slug) => API.get(`/towns/${slug}`),
createTown: (data) => API.post('/towns', data),
updateTown: (slug, data) => API.put(`/towns/${slug}`, data),
// Ensure this property mapping is exposed in your geoService export block:
createVillage: (data) => API.post('/villages', data),
getVillageBySlug: (slug) => API.get(`/villages/${slug}`),
// Ensure this property mapping is exposed in your geoService file:
updateVillage: (slug, data) => API.put(`/villages/${slug}`, data),
// Ensure your endpoints match your backend controllers explicitly.
// If your backend routes cities using query filters instead of sub-paths, verify it looks like this:
getCitiesByTaluka: (talukaSlug) => API.get(`/cities?taluka=${talukaSlug}`),
getTownsByTaluka: (talukaSlug) => API.get(`/towns?taluka=${talukaSlug}`),

getActivityLogs: () => API.get('/activitylogs'),

// === DASHBOARD AGGREGATION ALIASES ===
  getAllDivisions: () => API.get('/divisions'),
  getAllDistricts: () => API.get('/districts'),
  getAllTalukas: () => API.get('/talukas'),
  getAllVillages: () => API.get('/villages'),
  getAllCities: () => API.get('/cities'),
  getAllTowns: () => API.get('/towns'),

  getAdminProfile: () => API.get('/users/me'),             // Targets req.user out of JWT passport strategy
updateAdminProfile: (data) => API.put('/users/me', data), // Handles metadata adjustments
updateAdminPassword: (data) => API.put('/users/change-password', data) // Handles credential hashing sequences
};