import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDatabase } from '@/lib/database';

import Alert from '@/components/Alert';
import SubmitButton from '@/components/buttons/SubmitButton';
import TextInput from '@/components/inputs/TextInput';
import AuthenticationLayout from '@/components/layout/authentication.layout';
import Seo from '@/components/Seo';

import { useUI } from '@/contexts/ui.context';

type LoginFormData = {
  username?: string;
  password?: string;
  rememberMe?: boolean;
};

export default function LoginPage() {
  const { login } = useUI();
  const { getUsersDatabase } = useDatabase();
  const { register, handleSubmit, formState } = useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (formData: LoginFormData) => {
    setErrorMessage(null);

    try {
      const users = getUsersDatabase();

      if (users && formData.username && formData.password) {
        setLoadingSubmit(true);

        await new Promise((r) => setTimeout(r, 2000)); // simulate loading

        users
          .get(formData.username)
          .then((user) => {
            if (user.password === formData.password) {
              if (user.isBlocked) setErrorMessage('Ce compte a été bloqué.');
              else {
                login(user);
                return (window.location.href = '/');
              }
            } else setErrorMessage('Login failed');
          })
          .catch(() => setErrorMessage('Informations de connexion invalides.'))
          .finally(() => setLoadingSubmit(false));
      }
    } catch (error) {
      console.error('An error occured', error); // eslint-disable-line no-console
      setLoadingSubmit(false);
    }
  };

  return (
    <AuthenticationLayout>
      <Seo templateTitle='Se connecter' />

      <main>
        <section className='grid min-h-screen grid-cols-1 items-stretch text-white lg:grid-cols-2 xl:grid-cols-5'>
          <div className='relative z-0 mx-auto flex w-full max-w-xl items-center justify-center bg-white px-8 text-center xl:col-span-2'>
            <div className='z-20 mb-12 -mt-6 w-full max-w-lg p-6 text-left'>
              <div className='flex flex-col items-start justify-start gap-2 py-6'>
                <h1 className='text-heading text-3xl font-semibold leading-none tracking-tight text-gray-900'>
                  Bienvenue de nouveau
                </h1>
                <p className='text-body text-gray-500'>
                  Content de te revoir! Connectez-vous à votre compte s&apos;il
                  vous plaît.
                </p>
              </div>
              <form className='py-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                  <TextInput
                    id='username'
                    fieldName="Nom d'utilisateur"
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                    register={register('username', {
                      required: 'Ce champ est requis',
                    })}
                    loading={loadingSubmit}
                    error={formState.errors.username}
                  />
                </div>
                <div className='mb-6'>
                  <TextInput
                    id='password'
                    type='password'
                    fieldName='Mot de passe'
                    required
                    register={register('password', {
                      required: 'Ce champ est requis',
                    })}
                    loading={loadingSubmit}
                    error={formState.errors.password}
                  />
                </div>
                <div className='mb-6 flex flex-row items-center justify-between gap-4'>
                  <div
                    className={clsx(
                      'relative flex items-start',
                      loadingSubmit && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <div className='flex h-5 items-center'>
                      <input
                        id='rememberMe'
                        type='checkbox'
                        {...register('rememberMe')}
                        disabled={loadingSubmit}
                        className='h-4 w-4 rounded border-gray-300 text-gray-900 transition-all duration-300 focus:ring-gray-800 disabled:cursor-not-allowed'
                      />
                    </div>
                    <div className='ml-2 text-sm'>
                      <label
                        htmlFor='rememberMe'
                        className='font-semibold text-gray-600 transition-all duration-300 hover:text-gray-900'
                      >
                        Rappelez-vous pendant 30 jours
                      </label>
                    </div>
                  </div>
                </div>
                {!!errorMessage && (
                  <div className='mb-6'>
                    <Alert message={errorMessage} variant='error' />
                  </div>
                )}
                <div className='mb-6 flex w-full items-center justify-center'>
                  <SubmitButton isLoading={loadingSubmit} variant='primary'>
                    Se connecter
                  </SubmitButton>
                </div>
              </form>
            </div>
            <div className='absolute left-0 bottom-12 px-14 text-left'>
              <span className='text-xs leading-none text-gray-400'>
                @2022 ImageLiker. Tous les droits sont réservés.
              </span>
            </div>
          </div>

          <div className='bg-login relative hidden w-full items-center overflow-hidden bg-gray-50 bg-cover bg-no-repeat lg:flex xl:col-span-3' />
        </section>
      </main>

      <style jsx scoped>{`
        .bg-login {
          background-image: url(https://images.unsplash.com/photo-1574169208507-84376144848b?fit=crop&w=2079&q=80);
        }
      `}</style>
    </AuthenticationLayout>
  );
}
