"use client";

import { useDoctors } from "@/doctors/hooks/useDoctors";

export const DoctorsPage = () => {
  const { doctors } = useDoctors();

  return (
    <>
      {doctors == undefined ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor) => (
              <tr key={doctor.id}>
                <th>{doctor.id}</th>
                <td>{doctor.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
