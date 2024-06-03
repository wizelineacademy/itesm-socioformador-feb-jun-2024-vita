import ProfileField from './ProfileField'
import { EditProfileData, ProfileData } from '@/src/data/datatypes/profile'
import { UserData } from '@/src/data/datatypes/user'

interface ProfileFieldsProps {
  editMode: boolean
  editedDataProfile: EditProfileData | null
  userData: UserData | null
  userDataProfile: ProfileData | null
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
}

const ProfileFields: React.FC<ProfileFieldsProps> = ({
  editMode,
  editedDataProfile,
  userData,
  userDataProfile,
  handleInputChange,
}) => {
  return (
    <div className='flex flex-col sm:ml-2 lg:w-3/4'>
      <div className='flex flex-col justify-between lg:flex-row'>
        <ProfileField
          label='Nombre'
          value={editMode ? editedDataProfile?.name : userData?.name}
          editMode={editMode}
          name='name'
          onChange={handleInputChange}
          required={true}
        />
        <ProfileField
          label='Correo'
          value={editMode ? editedDataProfile?.email : userData?.email}
          editMode={editMode}
          name='email'
          onChange={handleInputChange}
          required={true}
        />
      </div>

      <div className='mt-2 flex flex-col justify-between lg:flex-row'>
        <ProfileField
          label='Teléfono'
          value={
            editMode ? editedDataProfile?.phoneNumber : userData?.phoneNumber
          }
          editMode={editMode}
          name='phoneNumber'
          onChange={handleInputChange}
          required={true}
          min='10'
        />
        <ProfileField
          label='Tipo de Sangre'
          value={
            editMode ? editedDataProfile?.bloodType : userDataProfile?.bloodType
          }
          editMode={editMode}
          name='bloodType'
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default ProfileFields
