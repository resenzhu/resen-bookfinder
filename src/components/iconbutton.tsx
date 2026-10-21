import type { JSX, MouseEventHandler, ReactNode } from 'react';

type IconButtonProps = {
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ icon, onClick }: IconButtonProps): JSX.Element => (
  <button
    className='flex size-10 cursor-pointer select-none items-center justify-center rounded-md bg-blue-500 px-2 text-white outline-none duration-150 active:bg-blue-600'
    type='button'
    onClick={onClick}
  >
    {icon}
  </button>
);

export default IconButton;
