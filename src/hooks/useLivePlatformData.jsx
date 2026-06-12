import { useState, useEffect } from "react";
import { geoService } from "@/services/geoService";

export function useLivePlatformData() {
  const [data, setData] = useState({
    divisions: [],
    districts: [],
    talukas: [],
    villages: [],
    cities: [],
    towns: [],
    stats: { divisionsCount: 6, districtsCount: 36, talukasCount: 358, totalVillages: 0, totalHospitals: 0, totalSchools: 0 },
    loading: true
  });

  useEffect(() => {
    async function fetchCloudData() {
      try {
        const [divsRes, distsRes, talsRes, vilsRes, citsRes, twnsRes] = await Promise.all([
          geoService.getAllDivisions(),
          geoService.getAllDistricts(),
          geoService.getAllTalukas(),
          geoService.getAllVillages(),
          geoService.getAllCities(),
          geoService.getAllTowns()
        ]);

        const divisions = divsRes?.data || [];
        const districts = distsRes?.data || [];
        const talukas = talsRes?.data || [];
        const villages = vilsRes?.data || [];
        const cities = citsRes?.data || [];
        const towns = twnsRes?.data || [];

        // 🧠 FIXED FALLBACKS: Sum up values from the database fields if leaf arrays are empty
        const totalVillagesCount = villages.length || divisions.reduce((sum, d) => sum + (Number(d.villages) || 0), 0);
        const totalTalukasCount = talukas.length || divisions.reduce((sum, d) => sum + (Number(d.talukas) || 0), 0);
        const totalDistrictsCount = districts.length || divisions.reduce((sum, d) => sum + (Number(d.districts) || 0), 0);

        const totalHospitalsCount = cities.reduce((s, c) => s + (Number(c.hospitals) || 0), 0) + towns.reduce((s, t) => s + (Number(t.hospitals) || 0), 0);
        const totalSchoolsCount = villages.reduce((s, v) => s + (Number(v.schools) || 0), 0) + cities.reduce((s, c) => s + (Number(c.schools) || 0), 0);

        setData({
          divisions,
          districts,
          talukas,
          villages,
          cities,
          towns,
          stats: {
            divisionsCount: divisions.length || 6,
            districtsCount: totalDistrictsCount || 36,
            talukasCount: totalTalukasCount || 358,
            totalVillages: totalVillagesCount,
            totalHospitals: totalHospitalsCount,
            totalSchools: totalSchoolsCount
          },
          loading: false
        });
      } catch (err) {
        console.error("Failed to load real-time database state:", err);
        setData(prev => ({ ...prev, loading: false }));
      }
    }
    fetchCloudData();
  }, []);

  return data;
}