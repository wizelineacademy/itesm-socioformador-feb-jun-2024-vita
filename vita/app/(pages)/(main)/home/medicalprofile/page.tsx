'use client';
import Swal from 'sweetalert2';
import React, { useState, useEffect} from "react";
import axios from  "axios"
import {  UserData } from '@/data/datatypes/user';
import ToggleComponent from '@/components/information/toggle';
import { AllergiesData, DisabilityData, EditAllergiesData, EditDisabilityData, EditProfileData, GetAllergiesData, GetDisabilityData, ProfileData } from '@/data/datatypes/profile';
import { FiInfo,FiEdit, FiTrash2 } from 'react-icons/fi';
import GetModal from '@/components/modal/getModal';
import AddModal from '@/components/modal/addModal';
import { disability } from '../../../../../db/schema/schema';


const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userDataProfile, setUserDataProfile] = useState<ProfileData | null>(null);
    const [editedDataProfile, setEditedDataProfile] = useState<EditProfileData | null>(null);
    //Allergies
    const [modalOpen, setModalOpen] = useState(false);
    const [allergiesData, setAllergiesData] = useState<GetAllergiesData | null>(null);
    const [selectedAllergy, setSelectedAllergy] = useState<AllergiesData | null>(null);
    const [editingAllergy, setEditingAllergy] = useState<EditAllergiesData | null>(null);
    
    const handleEditClick = (allergy: AllergiesData, allergyId: number) => {
        const editedAllergyData: EditAllergiesData = {
            idAllergies: allergyId,
            name: allergy.name,
            reaction: allergy.reaction
        };
        setEditingAllergy(editedAllergyData);
        openAllergyModal();
    };

    const DeleteAllergies = async (idAllergies: string) => {
        // Mostrar mensaje de confirmación
        const confirmationResult = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Quieres eliminar esta alergia?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        });
      
        // Si el usuario confirma la eliminación
        if (confirmationResult.isConfirmed) {
          try {
           
            const response = await axios.delete(`/api/profile/allergies/${idAllergies}`);
            if (response.status === 200) {
              
              Swal.fire({
                title: 'Éxito',
                text: 'La alergia ha sido eliminado exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              getData()
    
            } 
    
          } catch (error) {
            alert(error);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar la alergia',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      };

    // Función para abrir el modal
    const openModal = (allergy: AllergiesData) => {
        setSelectedAllergy(allergy);
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Estado local para almacenar el nombre de la nueva alergia
    const [newAllergy, setNewAllergy] = useState<AllergiesData>({ name: "", reaction: "" });
    // Estado local para controlar la visibilidad del modal de alergia
    const [allergyModalOpen, setAllergyModalOpen] = useState(false);

    // Función para abrir el modal de alergia
    const openAllergyModal = () => {
        setAllergyModalOpen(true);
    };

    // Función para cerrar el modal de alergia
    const closeAllergyModal = () => {
        resetAllergy();
        setAllergyModalOpen(false);
        setEditingAllergy(null);
    };

    const handleEdit = async () => {
        try {
            if (editingAllergy) {
                const response = await axios.put(`/api/profile/allergies/${editingAllergy.idAllergies}`, {
                    name: editingAllergy.name,
                    reaction: editingAllergy.reaction
                });
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Se han guardado los cambios con éxito',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    closeAllergyModal();
                    getData();
                    setEditingAllergy(null);
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar los cambios',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Función para manejar el cambio en el campo de nueva alergia
    const handleNewAllergyChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // Asigna un nuevo objeto AllergyData al estado newAllergy
        setNewAllergy(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
      

    const resetAllergy = () => {
        setNewAllergy({name: "", reaction: ""})
    };

    // Función para agregar una nueva alergia
const handleAddAllergy = async () => {
    try {
        if (editedDataProfile && newAllergy) {
            const { idMedicalProfile } = editedDataProfile;
            const allergyData = {
                name: newAllergy.name,
                reaction: newAllergy.reaction, // Cambiar por la reacción adecuada
                idMedicalProfile: idMedicalProfile
            };

            await axios.post("/api/profile/allergies", allergyData); 
            Swal.fire({
                title: 'Éxito',
                text: 'Se ha agregado una nueva alergia con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            resetAllergy();
            // Cerrar el modal después de agregar la alergia
            closeAllergyModal();
            
            // Actualizar la información del perfil después de agregar la alergia
            getData();
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: "Ocurrió un error al agregar la alergia",
            icon: 'error',
            confirmButtonText: 'OK'
        });
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
};

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
            //Allergies
            const allergies = await axios.get(`/api/profile/allergies/${fetchedData2.idMedicalProfile}`);
            const dataAllergies  = allergies.data;
            setAllergiesData(dataAllergies);
            // Disability
            const disability = await axios.get(`/api/profile/disabilities/${fetchedData2.idMedicalProfile}`);
            const dataDisability  = disability.data;
            setDisabilityData(dataDisability);

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

    

        //Disabilities
        const [modalOpen2, setModalOpen2] = useState(false);
        const [disabilityData, setDisabilityData] = useState<GetDisabilityData | null>(null);  
        const [selectedDisability, setSelectedDisability] = useState<DisabilityData | null>(null);
        const [editingDisability, setEditingDisability] = useState<EditDisabilityData | null>(null);
        
        const handleEditClickDisability = (disability: DisabilityData, disabilityId: number) => {
            const editedDisabilityData: EditDisabilityData = {
                idDisability: disabilityId,
                name: disability.name
            };
            setEditingDisability(editedDisabilityData);
            openDisabilityModal();
        };
    
        const DeleteDisability = async (idDisability: string) => {
            // Mostrar mensaje de confirmación
            const confirmationResult = await Swal.fire({
              title: '¿Estás seguro?',
              text: '¿Quieres eliminar esta discapacidad?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Eliminar',
              cancelButtonText: 'Cancelar',
              reverseButtons: true
            });
          
            // Si el usuario confirma la eliminación
            if (confirmationResult.isConfirmed) {
              try {
               
                const response = await axios.delete(`/api/profile/disabilities/${idDisability}`);
                if (response.status === 200) {
                  
                  Swal.fire({
                    title: 'Éxito',
                    text: 'La alergia ha sido eliminado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                  getData()
        
                } 
        
              } catch (error) {
                alert(error);
                Swal.fire({
                  title: 'Error',
                  text: 'Ocurrió un error al eliminar la alergia',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            }
          };
    
        // Función para abrir el modal
        const openModalDisability = (disability: DisabilityData) => {
            setSelectedDisability(disability);
            setModalOpen2(true);
        };
    
        // Función para cerrar el modal
        const closeModalDisability = () => {
            setModalOpen2(false);
        };
    
        // Estado local para almacenar el nombre de la nueva alergia
        const [newDisability, setNewDisability] = useState<DisabilityData>({ name: "" });
        // Estado local para controlar la visibilidad del modal de alergia
        const [disabilityModalOpen, setDisabilityModalOpen] = useState(false);
    
        // Función para abrir el modal de alergia
        const openDisabilityModal = () => {
            setDisabilityModalOpen(true);
        };
    
        // Función para cerrar el modal de alergia
        const closeDisabilityModal = () => {
            resetDisability();
            setDisabilityModalOpen(false);
            setEditingDisability(null);
        };
    
        const handleEditDisability = async () => {
            try {
                if (editingDisability) {
                    const response = await axios.put(`/api/profile/disabilities/${editingDisability.idDisability}`, {
                        name: editingDisability.name
                    });
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Éxito',
                            text: 'Se han guardado los cambios con éxito',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        closeDisabilityModal();
                        getData();
                        setEditingDisability(null);
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al guardar los cambios',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };
    
        // Función para manejar el cambio en el campo de nueva alergia
        const handleNewDisabilityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            // Asigna un nuevo objeto AllergyData al estado newAllergy
            setNewDisability(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
          
    
        const resetDisability = () => {
            setNewDisability({name: ""})
        };
    
        // Función para agregar una nueva alergia
    const handleAddDisability= async () => {
        try {
            if (editedDataProfile && newDisability) {
                const { idMedicalProfile } = editedDataProfile;
                const disabilityData = {
                    name: newDisability.name,
                    idMedicalProfile: idMedicalProfile
                };
    
                await axios.post("/api/profile/disabilities", disabilityData); 
                Swal.fire({
                    title: 'Éxito',
                    text: 'Se ha agregado  con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                resetDisability();
                // Cerrar el modal después de agregar la alergia
                closeDisabilityModal();
                
                // Actualizar la información del perfil después de agregar la alergia
                getData();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al agregar la discapacidad",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
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
                    <>
                    {allergiesData ? (
                        <div>
                            {/* Utilizar un map para renderizar cada alergia */}
                            {allergiesData.map((allergy, index) => (
                                <div key={index} className="flex flex-row mb-2 justify-around items-center">
                                    <p className="font-bold text-black text-lg py-2 px-6">Nombre de la alergía:</p>
                                    <div className="py-2 px-6 rounded-full lg:w-[280px] w-70 flex items-center bg-white">
                                        <p className="font-bold text-gray-400 text-lg">{allergy.name}</p>
                                    </div>
                                    {editMode ? (
                                        <>
                                            <FiTrash2
                                                className="ml-2 h-8 w-8 text-red-500 cursor-pointer hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-105"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    DeleteAllergies(allergy.idAllergies)
                                                }}
                                            />
                                            <FiEdit
                                                 className="ml-2 h-8 w-8 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
                                                 onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEditClick(allergy, allergy.idAllergies)
                                                }}
                                              
                                             
                                            />
                                        </>
                                    ) : (

                                        <FiInfo
                                            className="ml-2 h-8 w-8 text-gray-500 cursor-pointer hover:text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => openModal(allergy)}
                                            />
                                        )}
                                                    </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl text-black items-center ">No se han encontrado alergias.</p>
                    )}
                        {editMode ? (
                            <div className='flex justify-end mr-5'> 
                            <button
                            onClick={(e) => {
                                e.preventDefault();
                                openAllergyModal();
                            }}
                                className="  text-3xl bg-blue-500 hover:bg-blue-700 
                                 text-white font-bold py-1 px-4 rounded-full mt-2"
                            >
                                +
                            </button>
                            </div>
                        
                            ) : (
                                ''
                            )}
                    </>
                    </ToggleComponent>

                    <ToggleComponent title="Discapacidades" editModeToggle={false}> 
                    <>
                    {disabilityData ? (
                        <div>
                            {/* Utilizar un map para renderizar cada alergia */}
                            {disabilityData.map((disability, index) => (
                                <div key={index} className="flex flex-row mb-2 justify-around items-center">
                                    <p className="font-bold text-black text-lg py-2 px-6">Nombre de la dispacidad:</p>
                                    <div className="py-2 px-6 rounded-full lg:w-[280px] w-70 flex items-center bg-white">
                                        <p className="font-bold text-gray-400 text-lg">{disability.name}</p>
                                    </div>
                                    {editMode ? (
                                        <>
                                            <FiTrash2
                                                className="ml-2 h-8 w-8 text-red-500 cursor-pointer hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-105"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    DeleteDisability(disability.idDisability)
                                                }}
                                            />
                                            <FiEdit
                                                 className="ml-2 h-8 w-8 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
                                                 onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEditClickDisability(disability, disability.idDisability)
                                                }}
                                              
                                             
                                            />
                                        </>
                                    ) : (

                                        <FiInfo
                                            className="ml-2 h-8 w-8 text-gray-500 cursor-pointer hover:text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => openModalDisability(disability)}
                                            />
                                        )}
                                                    </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl text-black items-center ">No se han encontrado alergias.</p>
                    )}
                        {editMode ? (
                            <div className='flex justify-end mr-5'> 
                            <button
                            onClick={(e) => {
                                e.preventDefault();
                                openDisabilityModal();
                            }}
                                className="  text-3xl bg-blue-500 hover:bg-blue-700 
                                 text-white font-bold py-1 px-4 rounded-full mt-2"
                            >
                                +
                            </button>
                            </div>
                        
                            ) : (
                                ''
                            )}
                    </>
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
                            py-2 bg-blue-500 hover:bg-blue-700 w-70 text-white">
                                Guardar Cambios
                            </button>
                        </div>   
                        </>
                    )}
                
            </form>
            
            {/* get modal */}
            <GetModal
                modalOpen={modalOpen && selectedAllergy != null}
                closeModal={closeModal}
                modalTitle="Alergia"
                modalContent={[
                    { label: "Nombre de la alergía:", value: selectedAllergy?.name || "" },
                    { label: "Reacción alérgica:", value: selectedAllergy?.reaction || "" }
                ]}
                onCloseButtonClick={closeModal}
            />

            <GetModal
                modalOpen={modalOpen2 && selectedDisability  != null}
                closeModal={closeModalDisability}
                modalTitle="Discapacidad"
                modalContent={[
                    { label: "Nombre de la alergía:", value: selectedDisability?.name || "" },
                ]}
                onCloseButtonClick={closeModalDisability}
            />


           {/* Modal  POst */}
           <AddModal
                modalOpen={allergyModalOpen}
                editMode={editMode}
                closeModal={closeAllergyModal}
                handleAddItem={handleAddAllergy}
                item={newAllergy}
                handleItemChange={handleNewAllergyChange}
                title="Agregar Alergia"
                fields={[
                    { name: "name", placeholder: "Nombre de la alergia" },
                    { name: "reaction", placeholder: "Nombre de la reacción" }
                ]}
            />

            <AddModal
                modalOpen={disabilityModalOpen}
                editMode={editMode}
                closeModal={closeDisabilityModal}
                handleAddItem={handleAddDisability}
                item={newDisability}
                handleItemChange={handleNewDisabilityChange }
                title="Agregar Discapacidad"
                fields={[
                    { name: "name", placeholder: "Nombre de la discapacidad" },
                ]}
            />


            {/* Modal de edición de alergia */}
{editingAllergy && editMode &&  (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Editar Alergia</h2>
            <div className="mb-4">
                {/* Campo para editar el nombre de la alergia */}
                <input
                    type="text"
                    name="name"
                    value={editingAllergy.name}
                    onChange={(e) => setEditingAllergy({ ...editingAllergy, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Nombre de la alergia"
                    required
                />
            </div>
            <div className="mb-4">
                {/* Campo para editar la reacción de la alergia */}
                <input
                    type="text"
                    name="reaction"
                    value={editingAllergy.reaction}
                    onChange={(e) => setEditingAllergy({ ...editingAllergy, reaction: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Reacción de la alergia"
                    required
                />
            </div>
            {/* Botones para guardar los cambios o cancelar */}
            <div className="flex justify-end">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Guardar
                </button>
                <button
                    onClick={closeAllergyModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
)}

{/* Modal de edición de discapacidad*/}
{editingDisability && editMode &&  (
<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
<div className="bg-white p-8 rounded-lg">
<h2 className="text-2xl font-bold mb-4">Editar Discapacidad</h2>
<div className="mb-4">
    {/* Campo para editar el nombre de la alergia */}
    <input
        type="text"
        name="name"
        value={editingDisability.name}
        onChange={(e) => setEditingDisability({ ...editingDisability, name: e.target.value })}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Nombre de la alergia"
        required
    />
</div>
{/* Botones para guardar los cambios o cancelar */}
<div className="flex justify-end">
    <button
        onClick={handleEditDisability}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
    >
        Guardar
    </button>
    <button
        onClick={closeDisabilityModal}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
        Cancelar
    </button>
</div>
</div>
</div>
)}
        </div>
        
    );
};

export default Profile;