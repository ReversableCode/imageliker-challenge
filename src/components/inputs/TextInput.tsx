import clsx from 'clsx';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface TextInputProps {
  id: string;
  fieldName: string;
  required?: boolean;
  variant?: 'small' | 'full';
  type?: 'text' | 'password';

  disabled?: boolean;
  loading?: boolean;

  [x: string]: any;

  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function TextInput({
  id,
  fieldName,
  required,
  variant = 'full',
  type = 'text',

  disabled,
  loading,
  register,
  error,
  ...attributes
}: TextInputProps) {
  return (
    <div
      className={clsx(
        variant === 'full' ? 'col-span-2' : 'col-span-1',
        loading && 'opacity-50',
        'flex w-full flex-col transition-opacity duration-300'
      )}
    >
      <label
        htmlFor={id}
        className='block pb-1 text-sm font-semibold text-gray-800'
      >
        {fieldName} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={clsx(
          error
            ? 'border-red-300 text-red-400 placeholder-red-300'
            : 'border-gray-300 text-gray-800 placeholder-gray-500',
          'h-11 rounded-md border bg-transparent px-3 text-sm transition-colors duration-300 focus:border-gray-900 focus:outline-none focus:ring-gray-900 disabled:cursor-not-allowed'
        )}
        disabled={loading || disabled}
        {...attributes}
        {...register}
      />
      {error && (
        <div className='flex items-center justify-between pt-1 text-red-400'>
          <p className='text-xs'>{error.message}</p>
          <IoCloseCircleOutline className='m-0 h-4 w-4' />
        </div>
      )}
    </div>
  );
}
