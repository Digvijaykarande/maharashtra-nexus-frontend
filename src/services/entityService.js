import API from './api';

export const entityService = {
  // === COLLEGES ===
  getColleges: () => API.get('/colleges'),
  getCollegeBySlug: (slug) => API.get(`/colleges/${slug}`),
  createCollege: (data) => API.post('/colleges', data),
  updateCollege: (slug, data) => API.put(`/colleges/${slug}`, data),
  deleteCollege: (slug) => API.delete(`/colleges/${slug}`),

  // === HOSPITALS ===
  getHospitals: () => API.get('/hospitals'),
  getHospitalBySlug: (slug) => API.get(`/hospitals/${slug}`),
  createHospital: (data) => API.post('/hospitals', data),
  updateHospital: (slug, data) => API.put(`/hospitals/${slug}`, data),
  deleteHospital: (slug) => API.delete(`/hospitals/${slug}`),

  // === SCHOOLS ===
  getSchools: () => API.get('/schools'),
  getSchoolBySlug: (slug) => API.get(`/schools/${slug}`),
  createSchool: (data) => API.post('/schools', data),
  updateSchool: (slug, data) => API.put(`/schools/${slug}`, data),
  deleteSchool: (slug) => API.delete(`/schools/${slug}`),

  // === POPULATION RECORDS ===
  getPopulationRecords: () => API.get('/population'),
  getPopulationById: (id) => API.get(`/population/${id}`),
  createPopulationRecord: (data) => API.post('/population', data),
  updatePopulationRecord: (id, data) => API.put(`/population/${id}`, data),
  deletePopulationRecord: (id) => API.delete(`/population/${id}`),
};