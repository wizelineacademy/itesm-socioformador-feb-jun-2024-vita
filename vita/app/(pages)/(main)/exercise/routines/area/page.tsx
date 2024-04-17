'use client'
import SelectableCard from '@/components/cards/SelectableCard';
import SelectableCardWrapper from '@/components/cards/SelectableCardWrapper';
import SearchBarButton from '@/components/searchbar/SearchbarButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FaCheck, FaRunning, FaSearch } from 'react-icons/fa';

const AreaRoutine = () => {

    const areas = [
        "Hombros",
        "Trapecio",
        "Bíceps",
        "Pecho",
        "Abdominales",
        "Antebrazo",
        "Cuádriceps",
        "Tríceps",
        "Glúteos",
        "Espalda",
        "Isquiotibiales",
        "Gemelos",
        "Muslos",
        "Cuello"
    ]

    const [selections, setSelections] = useState<boolean[]>([]);
    const [list, setList] = useState<string[]>(areas);
  
    const router = useRouter();

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Rutinas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Escoge el área del cuerpo a entrenar</h3>

            <SearchBarButton
                list={areas}
                setList={setList}
                action={() => {
                    router.push("")
                }}
            />

            <SelectableCardWrapper>
                {list.map((area, index) => (
                    <SelectableCard
                        key={area}
                        text={area}
                        selected={selections[index]}
                        icon={FaRunning}
                        toggle={() => {
                            const newSelections = [...selections]
                            newSelections[index] = !newSelections[index];
                            setSelections(newSelections)
                        }}
                    />
                ))}
            </SelectableCardWrapper>
            
        </div>
    );
};

export default AreaRoutine;
