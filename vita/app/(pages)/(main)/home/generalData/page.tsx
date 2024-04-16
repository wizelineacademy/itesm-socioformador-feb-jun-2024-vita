
'use client';
import Swal from 'sweetalert2';
import React, { useState, useEffect} from "react";
import axios from  "axios"

interface HealthData {
    id_user_detail: number;
    id_user: number;
    sex: string;
    weight: number;
    height: number;
    birth_date: string;
    body_fat: number;
    muscular_mass: number;
}


interface EditHealthData {
    sex: string;
    weight: number;
    height: number; 
    body_fat: number;
    muscular_mass: number;
    birth_date: string;
}

const GeneralData = () => {
    const formatBirthDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const formatBirthDate2 = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
    
        // Asegúrate de que el mes y el día tengan dos dígitos
        if (month.length === 1) {
            month = "0" + month;
        }
        if (day.length === 1) {
            day = "0" + day;
        }
    
        return `${year}-${month}-${day}`;
    };
    
    const [userData, setUserData] = useState<HealthData | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState<EditHealthData | null>(null);

    // Dentro de handleInputChange
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedData) {
        if (name === 'birth_date') {
            const formattedDate = new Date(value).toISOString().split('T')[0];       
            setEditedData({ ...editedData, [name]: formattedDate });
        } else {
            setEditedData({ ...editedData, [name]: value });
        }
    }
};


const getData = async () => {
    try {
        const response = await axios.get("/api/healthdata");
        const fetchedData = response.data;
        setUserData(fetchedData);
        setEditedData(fetchedData); 
        
    
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: "Ocurrió un error al recuperar los datos",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}; 

    // Realiza la petición de datos al servidor cuando el componente se monta
    useEffect(() => {
        

        getData();
    }, []);

    // Función para guardar los cambios editados
    const handleSaveChanges = async () => {
        try {
            if (editedData) {
                
                await axios.post("/api/healthdata", editedData); 
              
                Swal.fire({
                    title: 'Éxito',
                    text: 'Se han guardado las datos con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setEditMode(false); 
                
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al actualizar los datos",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Función para cancelar la edición y volver a los datos originales
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedData(userData); // Restaura los datos editados a los datos originales
    };

    return (
        <>
            <div className="flex px-5 py-4 text-5xl font-bold lg:justify-start md:justify-start justify-start">
                <h1 className="lg:mr-2 text-home-title"> Datos Generales </h1>
            </div>
            <form onSubmit={handleSaveChanges }> 
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-30">
                <div className="flex flex-col">

                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6">
                            <p className="font-bold mb-6">Peso</p>
                            {editMode ? (
                                <span className="flex flex-row">
                                <input
                                    type="number"
                                    name="weight"
                                    value={editedData?.weight || ""}
                                    onChange={handleInputChange}
                                    className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                                />
                                <p className="font-bold ml-4">kg</p>
                                </span>
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && userData.weight}
                                    </div>
                                    <p className="font-bold ml-4">kg</p>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6">
                            <p className="font-bold mb-6">Sexo</p>
                            {editMode ? (
                                <select
                                name="sex"
                                value={editedData?.sex || ""}
                                onChange={handleInputChange}
                                className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                            >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                            
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && (userData.sex === 'M' ? 'Masculino' : 'Femenino')}
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6">
                            <p className="font-bold mb-6">Grasa Corporal</p>
                            {editMode ? (
                                <input
                                    type="number"
                                    name="body_fat"
                                    value={editedData?.body_fat || ""}
                                    onChange={handleInputChange}
                                    className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                                />
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && userData.body_fat}
                                    </div>
                                    <p className="font-bold ml-4">%</p>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Resto de los campos con un formato similar */}
                </div>   {/* columna*/}
                <div className="flex flex-col">
                    
                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6">
                            <p className="font-bold mb-6">Altura</p>
                            {editMode ? (
                                <span className="flex flex-row">
                                <input
                                    type="number"
                                    name="height"
                                    value={editedData?.height || ""}
                                    onChange={handleInputChange}
                                    className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                                />
                                <p className="font-bold ml-4">m</p>
                                </span>
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && userData.height}
                                    </div>
                                    <p className="font-bold ml-4">m</p>
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6 ">
                            <p className="font-bold mb-6">Fecha de Nacimiento</p>
                            {editMode ? (
                                <span className="flex flex-row">
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formatBirthDate2(editedData?.birth_date || "")}
                                    onChange={handleInputChange}
                                    className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                                />
                                
                                </span>
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && formatBirthDate(userData.birth_date)}
                                    </div>
                                    
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="px-5 py-4 mr-2">
                        <div className="text-black text-3xl mt-6">
                            <p className="font-bold mb-6">Masa muscular</p>
                            {editMode ? (
                                <span className="flex flex-row">
                                <input
                                    type="number"
                                    name="muscular_mass"
                                    value={editedData?.muscular_mass|| ""}
                                    onChange={handleInputChange}
                                    className="text-2xl py-2 px-6 rounded-full bg-input-home w-60"
                                />
                                
                                </span>
                            ) : (
                                <span className="flex flex-row">
                                    <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-60">
                                        {userData && userData.muscular_mass}
                                    </div>
                                    
                                </span>
                            )}
                        </div>
                    </div>

                </div>
                
            </div>  {/* general*/}

            {/* Botones de editar, guardar cambios y cancelar */}
            {!editMode ? (
                <div className="flex lg:justify-center lg:items-center ml-2 mb-6">
                    <button
                        onClick={() => setEditMode(true)}
                        className="rounded-full mt-2 text-2xl py-2 bg-button-home w-60 text-white"
                    >
                        Editar
                    </button>
                </div>
            ) : (
                <>
                <div className="flex lg:justify-center lg:items-center ml-2 mb-6 ">
                    <button onClick={handleCancelEdit} className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-mid-red w-60 text-white mr-6">
                        Cancelar
                    </button>
                    <button  type="submit" className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-button-home w-70 text-white">
                        Guardar Cambios
                    </button>
                </div>   
                </>
            )}
            </form>
        </>
    );
};

export default GeneralData;



