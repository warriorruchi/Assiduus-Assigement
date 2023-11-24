import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
function Dropdown({ options = [], label = 'Options', active, onChange, className }) {
  return (
    <div className="text-right">
      <Listbox value={active} onChange={onChange}>
        <div className="relative inline-block text-left mt-1">
          <Listbox.Button
            className={clsx(
              'relative w-full flex justify-center flex-row gap-2 items-center cursor-default rounded-lg bg-white border-slate-200 border-[1px] px-4 py-2 text-sm font-medium text-slate-600 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
              className,
            )}>
            <span className="block truncate">{active?.value || label}</span>
            <span className="material-symbols-outlined ">expand_more</span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm min-w-[120px]">
              {options.map(option => (
                <Listbox.Option
                  key={option.key}
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-green-300' : 'text-gray-900'}`}
                  value={option}>
                  {({ selected }) => <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.value}</span>}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
export default Dropdown;