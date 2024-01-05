import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "@/config";
import { Doctor } from "@/doctors/types/Doctor";
import { DoctorDTO } from "@/doctors/types/DoctorDTO";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>();

  useEffect(() => {
    // API request: GET
    axios.get(`${ApiUrl}/doctors`).then((response) => {
      // Prepare a list of doctors from endpoint's response (list of DoctorDTOs)
      const list = response.data.map((doctorDto: DoctorDTO) => ({
        id: doctorDto.id,
        firstName: doctorDto.firstName,
        lastName: doctorDto.lastName,
        specialization: doctorDto.specialization
      }));
      setDoctors(list);
    });
  }, []);

  return {
    doctors,
  };
};
