import React, { FC, ReactElement } from 'react'
import ResetForm from './ResetForm'

const ResetComponent: FC = (): ReactElement => {
    return (
        <div className='flex flex-col items-center justify-center space-y-3 px-3'>
            <ResetForm />
        </div>
    )
}

export default ResetComponent