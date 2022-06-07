/* eslint-disable no-console */
import { Level } from 'level';
import { useEffect, useRef } from 'react';

export type UsersModel = {
  id: string;
  name: string;
  password: string;
  isBlocked: boolean;
};

export type LikesModel = {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};

export const db = new Level<string, { [x: string]: any }>('image-liker-db', {
  valueEncoding: 'json',
});

export function getUsersDatabase() {
  return db.sublevel<string, UsersModel>('users', {
    valueEncoding: 'json',
  });
}

export function getLikesDatabase() {
  return db.sublevel<string, LikesModel>('likes', {
    valueEncoding: 'json',
  });
}

export function useDatabase() {
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current || typeof window === 'undefined') return;

    executedRef.current = true;

    async function init() {
      try {
        await db.get('config');
      } catch (error) {
        console.log('[LevelDB] Initializing database...');

        const users = db.sublevel<string, UsersModel>('users', {
          valueEncoding: 'json',
        });
        await users.put('muser1', {
          id: 'muser1',
          name: 'muser1',
          password: 'mpassword1',
          isBlocked: false,
        });
        await users.put('muser2', {
          id: 'muser2',
          name: 'muser2',
          password: 'mpassword2',
          isBlocked: false,
        });
        await users.put('muser3', {
          id: 'muser3',
          name: 'muser3',
          password: 'mpassword3',
          isBlocked: true,
        });

        await db.put('config', { version: 1 });

        console.log('[LevelDB] Database initialized.');
      }
    }
    init();
  }, []);

  return { db, getUsersDatabase, getLikesDatabase };
}
