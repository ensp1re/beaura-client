import ProfilePage from '@/app/components/root/Profile';
import React, { FC, ReactElement } from 'react'

const Profile: FC = (): ReactElement => {
    return (
        <ProfilePage isMyProfile={false} />
    )
}

export default Profile;