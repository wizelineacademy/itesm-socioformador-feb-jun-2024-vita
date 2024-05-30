'use client';
import ChallengeForm from "@/components/challenges/ChallengeForm";
import Link from "next/link"; 
import { useRouter } from "next/navigation";


const ResponseChallenge = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
      <span className="flex flex-row mb-4 text-start">
        <h1 className="text-5xl text-home-title">Hacer el reto</h1>
      </span>
      <Link href="/home/responseChallenge/">
        <div className="lg:justify-start md:justify-start justify-center text-white text-2xl bg-home-title mt-4 px-4 py-2 w-[380px] rounded-3xl transition-colors duration-300 ease-in-out hover:bg-[#1D154A] cursor-pointer">
          Hacer el reto/Evaluar a otros
        </div>
      </Link>
      <div className="pt-6">
        <ChallengeForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default ResponseChallenge;