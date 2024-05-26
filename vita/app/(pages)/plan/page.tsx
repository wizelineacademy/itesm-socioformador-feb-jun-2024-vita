'use client';
import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from "next/navigation";

interface Plan {
  name: string;
  price: number;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Bienestar Básico",
    price: 199,
    features: [
      "31 rutinas de ejercicio y 300 recetas de comida al mes.",
      "Metas de ejercicio, nutrición y sueño.",
      "90 detecciones de comida al mes.",
      "Blog de salud generado por inteligencia artificial",
      "Red Social para compartir progreso y apoyar a otros.",
      "Perfil Médico",
    ]
  },
  {
    name: "Bienestar Plus",
    price: 299,
    features: [
      "100 rutinas de ejercicio y 300 recetas de comida al mes.",
      "Metas de ejercicio, nutrición y sueño.",
      "300 detecciones de comida al mes.",
      "Chatbot de salud en la aplicación web.",
      "Recordatorios automáticos.",
      "Blog de salud generado por inteligencia artificial.",
      "Red Social para compartir progreso y apoyar a otros.",
      "Perfil Médico.",
      "Puntos y logros.",
    ]
  },
  {
    name: "Bienestar Total",
    price: 699,
    features: [
      "300 rutinas de ejercicio y 300 recetas de comida al mes.",
      "Metas de ejercicio, nutrición y sueño.",
      "1200 detecciones de comida al mes.",
      "Chatbot de Salud en WhatsApp y la aplicación web.",
      "Recordatorios automáticos.",
      "Blog de salud generado por inteligencia artificial.",
      "Red Social para compartir progreso y apoyar a otros.",
      "Perfil Médico.",
      "Mapa de expertos en salud.",
      "Reconocimiento de voz para chats de WhatsApp y la aplicación web.",
      "Puntos y logros.",
    ]
  }
];

const PricingPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Planes de Pago</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  const handleSelectPlan = () => {
    setSelected(!selected);

    router.push(`/home/?selectedPlan=${plan.name}`);
  };

  return (
    <div className="border rounded-md p-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-gray-800 flex flex-col justify-between h-full text-white">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-white">{plan.name}</h2>
        <p className="text-gray-400 mb-4">${plan.price}/mes</p>
        <ul className="list-disc pl-5 mb-4 text-white">
          {plan.features.map((feature, index) => (
            <li key={index} className="mb-2">{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-${selected ? 'green' : 'blue'}-400 hover:bg-${selected ? 'green' : 'blue'}-600 transform hover:scale-105 transition duration-300 w-full`}
          onClick={handleSelectPlan}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default PricingPage;


