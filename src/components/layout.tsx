import {
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import { IconButton, TextInput } from '@components/index';
import { type JSX, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (): void => {
    if (searchTerm.trim().length !== 0) {
      navigate('/', { state: { search: searchTerm.trim() } });
    }
  };
  return (
    <div className='flex flex-col font-Roboto'>
      <div className='fixed z-10 flex h-fit w-full items-center justify-between gap-2 bg-white px-4 py-2 shadow-md'>
        <TextInput
          placeholder='Search books...'
          value={searchTerm}
          onChange={({ target }): void => {
            setSearchTerm(target.value);
          }}
          onBlur={({ target }): void => {
            setSearchTerm(target.value.trim());
          }}
          onClear={(): void => {
            setSearchTerm('');
          }}
        />
        <IconButton
          icon={<MagnifyingGlassIcon className='size-5' />}
          onClick={(): void => {
            handleSearch();
          }}
        />
        <IconButton
          icon={
            isHomePage ? (
              <HeartIcon className='size-5' />
            ) : (
              <HomeIcon className='size-5' />
            )
          }
          onClick={(): void => {
            navigate(isHomePage ? '/favorites' : '/');
            if (!isHomePage) handleSearch();
          }}
        />
      </div>
      <section className='pt-14'>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
