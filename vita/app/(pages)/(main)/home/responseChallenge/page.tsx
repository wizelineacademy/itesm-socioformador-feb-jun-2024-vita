'use client';
import ChallengeForm from "@/components/challenges/ChallengeForm";
import { ChallengeSubmission } from "@/data/datatypes/challenge";
import axios from "axios";
import Link from "next/link"; 
import { useRouter } from "next/router"; // Cambiado de "next/navigation" a "next/router"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ResponseChallenge = () => {
    const [userData, setUserData] = useState<ChallengeSubmission | null>(null);
    const router = useRouter();

    const handleSuccess = () => {
        router.reload(); // Cambiado de router.refresh() a router.reload()
    };

    const getData = async () => {
        try {
            const response = await axios.get("/api/healthdata");
            const fetchedData = response.data;

            setUserData(fetchedData);
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
    }, []);

    return (
        <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
            <span className="flex flex-row mb-4 text-start">
                <h1 className="text-5xl text-home-title">{userData ? "Hacer el reto" : "Evaluar el reto"}</h1>
            </span>
            <Link href="/home/getChallenge/">
                <div className="lg:justify-start md:justify-start justify-center text-white text-2xl bg-home-title mt-4 px-4 py-2 w-[280px] rounded-3xl transition-colors duration-300 ease-in-out hover:bg-[#1D154A] cursor-pointer">
                    Ver el reto
                </div>
            </Link>
        
            <div className="pt-6">
                {userData ? (
                    <p className="text-white text-2xl bg-home-title mt-4 px-4 py-2 w-[380px] rounded-3xl">
                        Ya has contestado este desafío
                    </p>
                ) : (
                    <ChallengeForm onSuccess={handleSuccess} />
                )}
            </div>
        </div>
    );
};

export default ResponseChallenge;
