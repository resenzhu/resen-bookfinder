import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  JSX,
  Ref
} from 'react';
import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';

type TextInputProps = {
  ref?: Ref<HTMLInputElement>;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  icon?: JSX.Element;
  label?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  checked?: boolean;
  disabled?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClear?: () => void;
};

const TextInput = ({
  ref,
  inputMode,
  placeholder,
  value,
  maxLength,
  disabled,
  onFocus,
  onChange,
  onBlur,
  onClear
}: TextInputProps): JSX.Element => (
  <div className='relative h-10 w-full'>
    <input
      className={`size-full rounded-md border pl-2 text-sm leading-none outline-none transition-[border-color] focus:border-blue-400 ${disabled ? 'border-gray-400 bg-gray-300 text-gray-900' : 'border-gray-200 bg-white text-gray-700'} ${typeof onClear === 'undefined' ? 'pr-2' : 'pr-10'}`}
      ref={ref}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      autoComplete='off'
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
    {typeof onClear !== 'undefined' && (
      <Transition
        show={(value ?? '').length > 0}
        enter='ease-linear transition-[opacity]'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-linear transition-[opacity]'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        unmount={true}
      >
        <XCircleIcon
          className='absolute right-2 top-1/2 size-6 -translate-y-1/2 cursor-pointer text-gray-400'
          onClick={onClear}
        />
      </Transition>
    )}
  </div>
);

export default TextInput;
