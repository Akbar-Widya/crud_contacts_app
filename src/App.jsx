import { useCallback, useEffect, useMemo, useState } from "react";
import CrudControls from "./components/CrudControls";
import FilterInput from "./components/FilterInput";
import NameList from "./components/NameList";

const initialNames = [
   "Potter, Harry",
   "Granger, Hermione",
   "Victor, Krum",
   "Hagrid, Rubeus",
];

const App = () => {
   const [names, setNames] = useState(initialNames);
   const [selected, setSelected] = useState("");
   const [prefix, setPrefix] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [searchValue, setSearchValue] = useState("");

   const filteredNames = useMemo(() => names.filter((n) => n.toLowerCase().startsWith(prefix.toLowerCase())), [names, prefix])
   const hasValidInput = useMemo(
      () => firstName.trim() && lastName.trim(),
      [firstName, lastName]
   );

   useEffect(() => {
      if (selected) {
         const parts = selected.split(", ")
         setLastName(parts[0] || '')
         setFirstName(parts[1] || '')
      } else {
         setLastName('')
         setFirstName('')
      }
   }, [selected])

   const create = useCallback(() => {
      if (hasValidInput) {
         const fullName = `${lastName.trim()}, ${firstName.trim()}`;
         if (!names.includes(fullName)) {
            setNames((prevNames) => [...prevNames, fullName]);
            setFirstName("");
            setLastName("");
         }
      }
   }, [firstName, lastName, hasValidInput, names]);

   const del = useCallback(() => {
      if (selected) {
         setNames((prevNames) => prevNames.filter((name) => name !== selected));
         setSelected("");
      }
   });

   const update = useCallback(() => {
      if (selected && hasValidInput) {
         const i = names.indexOf(selected)
         const fullName = `${lastName.trim()}, ${firstName.trim()}`;
         if (i !== -1 && !names.includes(fullName)) {
            const newFullName = `${lastName.trim()}, ${firstName.trim()}`;
            const newNames = names.map((name, index) => index === i ? newFullName : name)
            setNames(newNames)
            setSelected
         }
      }
   }, [selected, hasValidInput, firstName, lastName, names])
   return (
      <div className="max-w-2xl mx-auto mt-10 space-y-6 p-5">
         <FilterInput 
            prefix={prefix}
            onPrefixChange={setPrefix}
         />
         <NameList
            names={filteredNames}
            selected={selected}
            onSelectChange={setSelected}
         />
         <CrudControls
            firstName={firstName}
            lastName={lastName}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onCreate={create}
            onDelete={del}
            onUpdate={update}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            isValid={hasValidInput}
            hasSelection={selected}
         />
      </div>
   );
};
export default App;
