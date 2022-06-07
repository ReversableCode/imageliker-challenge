/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoHeart } from 'react-icons/io5';

import { useDatabase } from '@/lib/database';

import DefaultLayout from '@/components/layout/default.layout';
import Seo from '@/components/Seo';

export default function LikedImagesPage() {
  const { getLikesDatabase } = useDatabase();
  const [images, setImages] = useState<any[]>([]);
  const [likedImages, setLikedImages] = useState<{ [x: string]: boolean }>({});

  async function handleLikes(image: any) {
    const isLiked = likedImages[image.id] ?? false;
    const likes = getLikesDatabase();

    try {
      if (isLiked) await likes.del(image.id);
      else await likes.put(image.id, image);
    } catch (error) {
      console.error('An error occured', error); // eslint-disable-line no-console
    }

    setLikedImages((prev) => ({
      ...prev,
      [image.id]: !isLiked,
    }));
  }

  useEffect(() => {
    if (likedImages.hasBeenExecuted) return;
    likedImages.hasBeenExecuted = true;

    (async () => {
      const liked_tmp: any = {};
      const images_tmp: any[] = [];
      const likes = getLikesDatabase();

      for await (const [key, value] of likes.iterator()) {
        images_tmp.push(value);
        liked_tmp[key] = true;
      }

      setLikedImages(liked_tmp);
      setImages(images_tmp);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DefaultLayout>
      <Seo templateTitle='Home' />

      {images.length > 0 && (
        <main className='grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5'>
          {images.map((image: any) => (
            <div
              key={image.id}
              className='relative flex w-full flex-col items-center justify-center gap-2.5'
            >
              <button
                type='button'
                className='group relative w-full overflow-hidden rounded-lg shadow-md'
                onClick={() => handleLikes(image)}
              >
                <img
                  className='aspect-video h-full w-full bg-center object-cover'
                  src={image.urls.regular}
                  alt={image.description}
                />
                <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <IoHeart
                    className={clsx(
                      'mr-1 h-20 w-20 stroke-white stroke-[12] transition-all duration-300',
                      likedImages[image.id]
                        ? 'animate-bounce text-rose-500'
                        : 'text-slate-500'
                    )}
                  />
                </div>
              </button>
              <div className='flex w-full flex-row items-center justify-between gap-4'>
                <div className='flex flex-row items-center justify-between gap-2'>
                  <img
                    className='h-5 w-5 rounded-full bg-center object-cover'
                    src={image.user.profile_image.small}
                    alt={image.user.name}
                  />
                  <span className='text-xs font-semibold leading-none tracking-wide text-slate-900'>
                    {image.user.name}
                  </span>
                </div>

                <motion.button
                  type='button'
                  key={likedImages[image.id] ? `${image.id}-liked` : image.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(
                    'flex flex-row items-center',
                    likedImages[image.id] ? 'text-rose-500' : 'text-slate-500'
                  )}
                  onClick={() => handleLikes(image)}
                >
                  <IoHeart className='mr-1 h-4 w-4 text-current transition-all duration-300' />
                  <span className='text-xs font-bold leading-none tracking-wide text-current transition-all duration-300'>
                    {likedImages[image.id] ? 'Vous avez aimé ça!' : image.likes}
                  </span>
                </motion.button>
              </div>
            </div>
          ))}
        </main>
      )}
    </DefaultLayout>
  );
}
