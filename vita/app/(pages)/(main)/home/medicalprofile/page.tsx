'use client';
import Swal from 'sweetalert2';
import React, { useState, useEffect} from "react";
import axios from  "axios"
import {  UserData } from '@/data/datatypes/user';
import ToggleComponent from '@/components/information/toggle';
import { EditProfileData, ProfileData } from '@/data/datatypes/profile';

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userDataProfile, setUserDataProfile] = useState<ProfileData | null>(null);
    const [editedDataProfile, setEditedDataProfile] = useState<EditProfileData | null>(null);

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedDataProfile({
            idUser: userData?.idUser || 0,
            name: userData?.name || "",
            email: userData?.email || "",
            phoneNumber: userData?.phoneNumber || null,
            idMedicalProfile: userDataProfile?.idMedicalProfile || 0,
            emergencyName:  userDataProfile?.emergencyName || null,
            emergencyPhone: userDataProfile?.emergencyPhone || null,
            policyUser:  userDataProfile?.policyUser || null,
            insuranceCompany:  userDataProfile?.insuranceCompany || null,
            bloodType:  userDataProfile?.bloodType || null
        });
    };

    // Función para manejar el cambio en los inputs
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // Validamos si hay datos editados y los actualizamos
        if (editedDataProfile) {  
            setEditedDataProfile({ ...editedDataProfile, [name]: value }); 
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get("/api/profile");
            const fetchedData = response.data;
            setUserData(fetchedData);
            const response2 = await axios.get("/api/profile/userData");
            const fetchedData2 = response2.data;
            setUserDataProfile(fetchedData2);

            setEditedDataProfile({
                idUser: fetchedData.idUser ,
                name: fetchedData.name,
                email: fetchedData.email,
                phoneNumber: fetchedData.phoneNumber,
                idMedicalProfile: fetchedData2.idMedicalProfile ,
                emergencyName:  fetchedData2.emergencyName ,
                emergencyPhone: fetchedData2.emergencyPhone ,
                policyUser:  fetchedData2.policyUser ,
                insuranceCompany:  fetchedData2.insuranceCompany,
                bloodType:  fetchedData2.bloodType 
            });
           
            
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

    // Función para guardar los cambios editados
    const handleSaveChanges = async () => {
        try {
            if (editedDataProfile) {
                
                await axios.put("/api/profile", editedDataProfile); 
              
                Swal.fire({
                    title: 'Éxito',
                    text: 'Se han guardado las datos con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                getData()
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

    return (
        <div className="mb-4">
            <div className="flex text-white sm:px-5 sm:py-4  text-5xl  font-bold 
                lg:justify-start md:justify-start sm:justify-center justify-start mt-4">
                <h1 className=" pl-2 sm:pl-0 mr-2 text-title-profile w-[800px]">
                Perfil 
                </h1>
            </div>
            <div  className='flex flex-col lg:w-3/4 sm:ml-2'>

                <div className='flex lg:flex-row  flex-col justify-between'>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Nombre </p>
                        {editMode ? (
                        <input
                            type="text"
                            name="name"
                            value={editedDataProfile?.name|| ""}
                            onChange={handleInputChange}
                            className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] "
                            required 
                        />
                        ) : ( 
                            <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                                    {userData && userData.name ? (
                                userData.name
                            ) : (
                                ' Sin datos'
                            )}
                            </div>
                         )}
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Correo </p>
                        {editMode ? (
                        <input
                            type="email"
                            name="email"
                            value={editedDataProfile?.email|| ""}
                            onChange={handleInputChange}
                            className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] "
                            required 
                        />
                        ) : ( 
                            <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                                    {userData && userData.email  ? (
                                userData.email 
                            ) : (
                                ' Sin datos'
                            )}
                            </div>
                         )}
                        
                    </div>
                </div>

                <div className='flex lg:flex-row  flex-col justify-between mt-2'>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2"> Teléfono </p>
                        {editMode ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editedDataProfile?.phoneNumber || ""}
                            onChange={handleInputChange}
                            className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] "
                            required 
                            min= "10"
                        />
                        ) : ( 
                            <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                                    {userData && userData.phoneNumber   ? (
                                userData.phoneNumber  
                            ) : (
                                ' Sin datos'
                            )}
                            </div>
                         )}
                        
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Tipo de Sangre </p>
                        {editMode ? (
                        <input
                            type="text"
                            name="bloodType"
                            value={editedDataProfile?.bloodType || ""}
                            onChange={handleInputChange}
                            className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] "
                            required 
                        />
                        ) : ( 
                            <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                                {userDataProfile && userDataProfile.bloodType ? (
                                        userDataProfile.bloodType
                                ) : (
                                    ' Sin datos'
                                )}
                            </div>
                         )}
                    </div>
                </div>

            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
            }}>
                <div  className="mt-4  pl-2">
                    <ToggleComponent title="Contacto " editModeToggle={false}>
                        <div className="flex lg:flex-row flex-col justify-around"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Nombre del contacto:</p>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="emergencyName"
                                        value={editedDataProfile?.emergencyName || ""}
                                        onChange={handleInputChange}
                                        className="py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white font-bold text-gray-400 text-lg"
                                        required 
                                    />
                                    ) : ( 
                                        <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                        <p className="font-bold text-gray-400 text-lg"> 
                                        {userDataProfile && userDataProfile.emergencyName ? (
                                            userDataProfile.emergencyName
                                        ) : (
                                            ' Sin datos'
                                        )}
                                        </p>
                                    </div>
                                )}
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Teléfono del contacto:</p>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="emergencyPhone"
                                        value={editedDataProfile?.emergencyPhone|| ""}
                                        onChange={handleInputChange}
                                        className="py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white font-bold text-gray-400 text-lg"
                                        required 
                                        min="10"
                                    />
                                    ) : ( 
                                        <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                        <p className="font-bold text-gray-400 text-lg"> 
                                        {userDataProfile && userDataProfile.emergencyPhone ? (
                                            userDataProfile.emergencyPhone
                                        ) : (
                                            ' Sin datos'
                                        )}
                                        </p>
                                    </div>
                                )}
                            </div> 
                        </div>
                    </ToggleComponent>

                    <ToggleComponent title="Póliza" editModeToggle={false}>
                        <div className="flex lg:flex-row flex-col justify-around"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Número del seguro:</p>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="policyUser"
                                        value={editedDataProfile?.policyUser|| ""}
                                        onChange={handleInputChange}
                                        className="py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white font-bold text-gray-400 text-lg"
                                        required 
                                    />
                                    ) : ( 
                                        <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                        <p className="font-bold text-gray-400 text-lg"> 
                                        {userDataProfile && userDataProfile.policyUser ? (
                                            userDataProfile.policyUser
                                        ) : (
                                            ' Sin datos'
                                        )}
                                        </p>
                                    </div>
                                )}
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6">Nombre de la aseguradora:</p>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="insuranceCompany"
                                        value={editedDataProfile?.insuranceCompany|| ""}
                                        onChange={handleInputChange}
                                        className="py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white font-bold text-gray-400 text-lg"
                                        required 
                                    />
                                    ) : ( 
                                        <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                        <p className="font-bold text-gray-400 text-lg"> 
                                        {userDataProfile && userDataProfile.insuranceCompany ? (
                                            userDataProfile.insuranceCompany
                                        ) : (
                                            ' Sin datos'
                                        )}
                                        </p>
                                    </div>
                                )}
                            </div> 
                        </div>
                    </ToggleComponent>

                    <ToggleComponent title="Alergías" editModeToggle={false}>
                    <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la alergía:</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg"> Polvo</p>
                                </div>
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6">Reacción alérgica:</p>
                                <div className='py-2 px-6 rounded-full   lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg">Dolor de Cabeza</p>
                                </div>
                            </div> 
                    </div>
                    <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la alergía:</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px]  w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg"> Polvo</p>
                                </div>
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6">Reacción alérgica:</p>
                                <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg">Dolor de Cabeza</p>
                                </div>
                            </div> 
                    </div>   
                    </ToggleComponent>

                    <ToggleComponent title="Discapacidades" editModeToggle={false}> 
                        <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                            <p className="font-bold text-gray-400 text-lg"> Anorexia</p>
                        </div>
                    </ToggleComponent>

                    <ToggleComponent title="Enfermedades crónicas " editModeToggle={false}>
                        <div className='py-2 px-6 rounded-full lg:w-[280px]  w-70 bg-white'> 
                            <p className="font-bold text-gray-400 text-lg"> Diabetes</p>
                        </div>
                    </ToggleComponent>

                    <ToggleComponent title="Medicinas" editModeToggle={false}>
                    <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la medicina:</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg"> Salbutamol</p>
                                </div>
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6">Vía de administración:</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg">Oral</p>
                                </div>
                            </div> 
                    </div>
                    <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6"> Dosis:</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg"> 20 ml</p>
                                </div>
                            </div> 
                            <div className='flex  flex-col '> 
                                <p className="font-bold text-black text-lg py-2 px-6">Duración:</p>
                                <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                    <p className="font-bold text-gray-400 text-lg">Cada 2 horas</p>
                                </div>
                            </div> 
                    </div>   
                    </ToggleComponent>

                
                    </div>
                
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
        </div>
    );
};

export default Profile;
