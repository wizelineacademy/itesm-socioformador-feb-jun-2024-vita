"use client"
import React, { useState, useEffect } from 'react';
import { FaBell, FaMedal, FaStar } from 'react-icons/fa';
import axios from 'axios';
import Loader from '@/src/components/Loader';
import Swal from 'sweetalert2';
import { Badge, UserBadge } from '@/src/data/datatypes/badge';
import { UserAdmin } from '@/src/data/datatypes/user';

const BadgeComponent = () => {
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const [userBadges, setUserBadges] = useState<UserBadge[] | null>(null);
  const [user, setUser] = useState<UserAdmin[] | null>(null);

  const getData = async () => {
    try {
      const response = await axios.get("/api/badge");
      const fetchedData = response.data;
      setBadges(fetchedData);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: "Ocurrió un error al recuperar los datos",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }; 

  const getDataBadge = async () => {
    try {
      const response = await axios.get("/api/badgeUser");
      const fetchedData = response.data;
      setUserBadges(fetchedData);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: "Ocurrió un error al recuperar los datos",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }; 

  const getUser = async () => {
    try {
      const response = await axios.get("/api/membership");
      const fetchedData = response.data;
      setUser(fetchedData);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: "Ocurrió un error al recuperar los datos",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }; 

  useEffect(() => {
    getData();
    getDataBadge();
    getUser();
  }, []);

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
      <span className="flex items-center mb-4"> 
        <h1 className="mr-2 text-home-title">Logros</h1>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full md:w-3/4">
        {badges ? (
          badges.map((badge, index) => {
            const obtainedBadge = userBadges && userBadges.find(userBadge => userBadge.badgeId === badge.idBadge && user && user[0]?.idUser === userBadge.userId);
            const isObtained = obtainedBadge !== undefined;
            return (
              <div key={index} className={`flex flex-col items-center p-4 rounded-lg 
               ${isObtained ? 'bg-gray-700 text-yellow-500' : 'hover:bg-gray-700 bg-gradient-to-b from-transparent to-gray-800 text-gray-600 hover:text-white'}`}>
                <div className="text-6xl mb-2 ">
                  {index % 3 === 0 && <FaBell />}
                  {index % 3 === 1 && <FaMedal />}
                  {index % 3 === 2 && <FaStar />}
                </div>
                <h2 className="text-xl text-white">{badge.name}</h2>
                <p className="text-sm text-gray-200">{badge.description}</p>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default BadgeComponent;
