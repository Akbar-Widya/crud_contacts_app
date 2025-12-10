import { useState, useMemo, useCallback, useEffect } from 'react';
import FilterInput from './components/FilterInput';
import NameList from './components/NameList';
import CrudControls from './components/CrudControls';

const initialNames = ['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'];

function App() {
  // --- State and Logic (omitted for brevity) ---
  const [names, setNames] = useState(initialNames);
  const [selected, setSelected] = useState('');
  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const filteredNames = useMemo(() => names.filter((n) => n.toLowerCase().startsWith(prefix.toLowerCase())), [names, prefix]);
  const hasValidInput = useMemo(() => firstName.trim() && lastName.trim(), [firstName, lastName]);
  
  useEffect(() => {
    if (selected) {
      const parts = selected.split(', ');
      setLastName(parts[0] || '');
      setFirstName(parts[1] || '');
    } else {
      setLastName('');
      setFirstName('');
    }
  }, [selected]);

  const create = useCallback(() => {
    if (hasValidInput) {
      const fullName = `${lastName.trim()}, ${firstName.trim()}`;
      if (!names.includes(fullName)) {
        setNames((prevNames) => [...prevNames, fullName]);
        setFirstName('');
        setLastName('');
      }
    }
  }, [hasValidInput, lastName, firstName, names]);

  const update = useCallback(() => {
    if (hasValidInput && selected) {
      const i = names.indexOf(selected);
      if (i !== -1) {
        const newFullName = `${lastName.trim()}, ${firstName.trim()}`;
        const newNames = names.map((name, index) => index === i ? newFullName : name);
        setNames(newNames);
        setSelected(newFullName);
      }
    }
  }, [hasValidInput, selected, names, lastName, firstName]);

  const del = useCallback(() => {
    if (selected) {
      setNames((prevNames) => prevNames.filter(name => name !== selected));
      setSelected('');
    }
  }, [selected]);
  // ----------------------------------------

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">CRUD Name Manager</h2>
      
      <FilterInput 
        prefix={prefix}
        onPrefixChange={setPrefix}
      />
      
      {/* Flex container for the main side-by-side layout */}
      {/* items-start prevents vertical stretching of the listbox */}
      <div className="flex items-start gap-6 w-full"> 
        <NameList 
          names={filteredNames}
          selected={selected}
          onSelectChange={setSelected}
          className="flex-1" 
        />

        <CrudControls 
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          
          onCreate={create}
          onUpdate={update}
          onDelete={del}

          isValid={hasValidInput}
          hasSelection={!!selected}
        />
      </div>
    </div>
  );
}

export default App;