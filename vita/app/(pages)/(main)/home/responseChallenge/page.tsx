'use client';
import ChallengeForm from "@/components/challenges/ChallengeForm";
import { ChallengeSubmission } from "@/data/datatypes/challenge";
import axios from "axios";
import Link from "next/link"; 
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ResponseChallenge = () => {
    const [userData, setUserData] = useState<ChallengeSubmission[] | null>(null);
    const [userDataSub, setUserDataSub] = useState<ChallengeSubmission[] | null>(null);
    const [score, setScore] = useState<number | null>(null);

    const getData = async () => {
        try {
            const response = await axios.get("/api/monthlyChallenge");
            const fetchedData = response.data;
            console.log(response.data);
            setUserData(fetchedData.length > 0 ? fetchedData : null);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al recuperar los datos",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }; 

    const getDataSub = async () => {
        try {
            const response = await axios.get("/api/evaluations");
            const fetchedData = response.data;
            console.log(response.data);
            setUserDataSub(fetchedData.length > 0 ? fetchedData : null);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al recuperar los datos",
                icon: 'error',
                confirmButtonText: 'OK'
            }); ``
        }
    };

    const handleSubmitEvaluation = async (submissionId: number) => {
        try {
            // Enviar la evaluación al servidor con Axios
            const response = await axios.post('/api/evaluations', {
                score,
                idUser: submissionId,
                idChallenge: userDataSub[0].idChallenge
            });
            getDataSub();
            Swal.fire({
                title: 'Éxito',
                text: 'Evaluación enviada exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al enviar la evaluación',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    useEffect(() => {
        getData();
        getDataSub();
    }, []);

    return (
        <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
            <span className="flex flex-row mb-4 text-start">
                <h1 className="text-5xl text-home-title">{!userData ? "Hacer el reto" : "Evaluar el reto"}</h1>
            </span>
            <Link href="/home/getChallenge/">
                <div className="lg:justify-start md:justify-start justify-center text-white text-2xl bg-home-title mt-4 px-4 py-2 w-[280px] rounded-3xl transition-colors duration-300 ease-in-out hover:bg-[#1D154A] cursor-pointer">
                    Ver el reto
                </div>
            </Link>
        
            <div >
                {!userData ? (
                    <ChallengeForm />
                ) : (
                    userDataSub ? (
                        <div className="flex flex-col items-center justify-center p-6 lg:p-12">
                            {userDataSub.map((submission) => (
                                <div key={submission.idUser} className=" w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6">
                                    <img src={submission.imageUrl} alt="Challenge Image" className="w-full h-64 object-cover rounded-lg"/>
                                    <div className="p-6">
                                        <label className="text-2xl font-semibold mb-2 text-gray-700 text-center">
                                            Descripción:
                                        </label>
                                        <p className="text-xl mb-4 text-center w-[80%]s" >{submission.description}</p>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="score" className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Puntaje:</label>
                                            <select
                                                id="score"
                                                value={score ?? ""}
                                                onChange={(e) => setScore(Number(e.target.value))}
                                                className="w-full p-2 border rounded-md mb-2 mt-2 text-base focus:outline-none focus:border-blue-500"
                                            >
                                                <option value="" disabled className="text-gray-500 mb-2">Calificación</option>
                                                {[...Array(10).keys()].map((i) => (
                                                    <option key={i+1} value={i+1}>{i+1}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button" 
                                                onClick={() => handleSubmitEvaluation(userDataSub[0].idUser)}
                                                className="rounded-full py-3 px-6 bg-blue-500 text-white text-xl font-semibold transition 
                                                duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
                                            >
                                                Enviar Evaluación
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    ) : (
                        <p className="mt-6 text-3xl text-center text-red-500">
                            Ya has contestado y evaluado en este desafío 
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default ResponseChallenge;
