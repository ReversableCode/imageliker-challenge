import clsx from 'clsx';

type SubmitButtonProps = {
  variant: 'primary';
  isLoading?: boolean;
} & React.ComponentPropsWithRef<'button'>;

export default function SubmitButton({
  disabled,
  isLoading,
  children,
  variant,
}: SubmitButtonProps) {
  return (
    <button
      type='submit'
      className={clsx(
        'flex h-12 w-full items-center justify-center gap-4 rounded-md px-4 font-semibold tracking-wide transition-all duration-300 focus:outline-none disabled:cursor-not-allowed',
        variant === 'primary' &&
          'bg-gray-800 text-white hover:bg-gray-900 focus:bg-black'
      )}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading && (
        <svg
          className='inline-flex h-4 w-4 animate-spin text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      )}
    </button>
  );
}
