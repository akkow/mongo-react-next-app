import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ObjectId } from 'mongoose'

const categories = [
  { id: 1, name: 'Visos', value: '' },
  { id: 2, name: 'Informacinės technologijos', value: 'Informacinės Technologijos' },
  { id: 3, name: 'Gamyba', value: 'Gamyba' },
  { id: 4, name: 'Finansai', value: 'Finansai' },
  { id: 5, name: 'Elektronika', value: 'Elektronika' },
  { id: 6, name: 'Statyba', value: 'Statyba' },
]

export default function FilterComboBoxCategory({ getDataFromChildren }: any) {
  const [selected, setSelected] = useState(categories[0])
  const [query, setQuery] = useState('')
  getDataFromChildren(selected.value);

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((category) =>
      category.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="flex flex-col">
        <h1 className="flex flex-col items-center text-black font-bold underline text-xl">Sritis</h1>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative ">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full input input-bordered border-none py-2 pl-3 pr-16 text-sm leading-5 bg-gray-100 text-gray-900 focus:ring-0"
              displayValue={(category: any) => category.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="hover:bg-green-500 rounded-xl transition-all hover:text-white h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCategories.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <Combobox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
