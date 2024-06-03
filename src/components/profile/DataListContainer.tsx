import React from 'react'
import DataItemComponent from './DataItemComponent'
import AddModalButton from './AddModalButton'
import {
  AllergiesData,
  ChronicalData,
  DisabilityData,
  EditAllergiesData,
  EditChronicalData,
  EditDisabilityData,
  EditMedicinesData,
  GetAllergiesData,
  GetChronicalData,
  GetDisabilityData,
  GetMedicinesData,
  MedicinesData,
} from '@/src/data/datatypes/profile'
import ToggleComponent from '../information/toggle'

interface Props {
  editMode: boolean
  allergiesData: GetAllergiesData | null
  disabilityData: GetDisabilityData | null
  chronicalData: GetChronicalData | null
  medicinesData: GetMedicinesData | null
  deleteItem: (id: number, type: string, url: string) => void
  handleEditClick: (item: EditAllergiesData, id: number) => void
  handleEditClickDisability: (item: EditDisabilityData, id: number) => void
  handleEditClickChronical: (item: EditChronicalData, id: number) => void
  handleEditClickMedicines: (item: EditMedicinesData, id: number) => void
  openModalAllergy: (allergy: AllergiesData) => void
  openModalDisability: (disability: DisabilityData) => void
  openModalChronical: (chronical: ChronicalData) => void
  openModalMedicines: (medicines: MedicinesData) => void
  openAllergyModal: () => void
  openDisabilityModal: () => void
  openChronicalModal: () => void
  openMedicinesModal: () => void
}

const DataListContainer: React.FC<Props> = ({
  editMode,
  allergiesData,
  disabilityData,
  chronicalData,
  medicinesData,
  deleteItem,
  handleEditClick,
  handleEditClickDisability,
  handleEditClickChronical,
  handleEditClickMedicines,
  openModalAllergy,
  openModalDisability,
  openModalChronical,
  openModalMedicines,
  openAllergyModal,
  openDisabilityModal,
  openChronicalModal,
  openMedicinesModal,
}) => (
  <>
    <ToggleComponent title='Alergías' editModeToggle={false}>
      <>
        {allergiesData && allergiesData.length > 0 ? (
          <div>
            {allergiesData.map((allergy, index) => (
              <DataItemComponent
                key={index}
                item={allergy}
                itemType='allergies'
                itemLabel='alergía'
                id={allergy.idAllergies}
                editMode={editMode}
                deleteItem={deleteItem}
                handleEditClick={handleEditClick}
                openModal={openModalAllergy}
              />
            ))}
          </div>
        ) : (
          <p className='items-center text-2xl text-black'>
            No se han encontrado alergias.
          </p>
        )}
        <AddModalButton editMode={editMode} onClick={openAllergyModal} />
      </>
    </ToggleComponent>

    <ToggleComponent title='Discapacidades' editModeToggle={false}>
      <>
        {disabilityData && disabilityData.length > 0 ? (
          <div>
            {disabilityData.map((disability, index) => (
              <DataItemComponent
                key={index}
                item={disability}
                itemType='disabilities'
                itemLabel='discapacidad'
                id={disability.idDisability}
                editMode={editMode}
                deleteItem={deleteItem}
                handleEditClick={handleEditClickDisability}
                openModal={openModalDisability}
              />
            ))}
          </div>
        ) : (
          <p className='items-center text-2xl text-black'>
            No se han encontrado discapacidades.
          </p>
        )}
        <AddModalButton editMode={editMode} onClick={openDisabilityModal} />
      </>
    </ToggleComponent>

    <ToggleComponent title='Enfermedades crónicas' editModeToggle={false}>
      <>
        {chronicalData && chronicalData.length > 0 ? (
          <div>
            {chronicalData.map((chronical, index) => (
              <DataItemComponent
                key={index}
                item={chronical}
                itemType='chronicalDisease'
                itemLabel='enfermedad crónica'
                id={chronical.idChronicalDesease}
                editMode={editMode}
                deleteItem={deleteItem}
                handleEditClick={handleEditClickChronical}
                openModal={openModalChronical}
              />
            ))}
          </div>
        ) : (
          <p className='items-center text-2xl text-black'>
            No se han encontrado enfermedades crónicas.
          </p>
        )}
        <AddModalButton editMode={editMode} onClick={openChronicalModal} />
      </>
    </ToggleComponent>

    <ToggleComponent title='Medicinas' editModeToggle={false}>
      {medicinesData && medicinesData.length > 0 ? (
        <div>
          {medicinesData.map((medicine, index) => (
            <DataItemComponent
              key={index}
              item={medicine}
              itemType='medicines'
              itemLabel='medicina'
              id={medicine.idMedicines}
              editMode={editMode}
              deleteItem={deleteItem}
              handleEditClick={handleEditClickMedicines}
              openModal={openModalMedicines}
            />
          ))}
        </div>
      ) : (
        <p className='items-center text-2xl text-black'>
          No se han encontrado medicinas.
        </p>
      )}
      <AddModalButton editMode={editMode} onClick={openMedicinesModal} />
    </ToggleComponent>
  </>
)

export default DataListContainer
