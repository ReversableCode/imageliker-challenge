import clsx from 'clsx';
import { IoCloseCircle } from 'react-icons/io5';

type AlertProps = {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  link?: string;
};

export default function Alert({ message, variant, link }: AlertProps) {
  return (
    <div
      className={clsx(
        'rounded-md p-4',
        variant === 'info' && 'bg-blue-50',
        variant === 'error' && 'bg-red-50',
        variant === 'success' && 'bg-green-50',
        variant === 'warning' && 'bg-orange-50'
      )}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          {variant === 'info' && (
            <IoCloseCircle
              className='h-5 w-5 text-blue-400'
              aria-hidden='true'
            />
          )}
          {variant === 'error' && (
            <IoCloseCircle
              className='h-5 w-5 text-red-400'
              aria-hidden='true'
            />
          )}
          {variant === 'warning' && (
            <IoCloseCircle
              className='h-5 w-5 text-yellow-400'
              aria-hidden='true'
            />
          )}
          {variant === 'success' && (
            <IoCloseCircle
              className='h-5 w-5 text-emerald-400'
              aria-hidden='true'
            />
          )}
        </div>
        <div className='ml-3 flex-1 md:flex md:justify-between'>
          <p
            className={clsx(
              'text-sm',
              variant === 'info' && 'text-blue-700',
              variant === 'error' && 'text-red-700',
              variant === 'warning' && 'text-yellow-700',
              variant === 'success' && 'text-emerald-700'
            )}
          >
            {message}
          </p>
          {!!link && (
            <p className='mt-3 text-sm md:mt-0 md:ml-6'>
              <a
                href='#'
                className={clsx(
                  'whitespace-nowrap font-medium',
                  variant === 'info' && 'text-blue-700 hover:text-blue-600',
                  variant === 'error' && 'text-red-700 hover:text-red-600',
                  variant === 'warning' &&
                    'text-yellow-700 hover:text-yellow-600',
                  variant === 'success' &&
                    'text-emerald-700 hover:text-emerald-600'
                )}
              >
                Details <span aria-hidden='true'>&rarr;</span>
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
