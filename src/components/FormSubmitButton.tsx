'use client'

import {ComponentPropsWithoutRef, ReactNode} from "react";
import {useFormStatus} from "react-dom";

type FormSubmitButtonProps = {
    children: ReactNode
    classname?: string
} & ComponentPropsWithoutRef<'button'>

export const FormSubmitButton = ({children, classname, ...rest}: FormSubmitButtonProps) => {
    const {pending} = useFormStatus()

    return (
        <button
            className={`btn btn-primary ${classname}`}
            disabled={pending}
            type={'submit'}
            {...rest}
        >
            {pending && <span className="loading loading-ball loading-lg"></span>}
            {children}
        </button>
    )
}