import React, { useState, useMemo, useCallback, useEffect } from "react";

const initialNames = ["Emil, Hans", "Mustermann, Max", "Tisch, Roman"];

function CrudApp() {
   const [names, setNames] = useState(initialNames);
   const [selected, setSelected] = useState("");
   const [prefix, setPrefix] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");

   const filteredNames = useMemo(() => {
      return names.filter((n) =>
         n.toLowerCase().startsWith(prefix.toLowerCase())
      );
   }, [names, prefix]); 

   useEffect(() => {
      if (selected) {
         const parts = selected.split(", ");
         setLastName(parts[0] || "");
         setFirstName(parts[1] || "");
      } else {
         setLastName("");
         setFirstName("");
      }
   }, [selected]);

   const hasValidInput = useCallback(() => {
      return firstName.trim() && lastName.trim();
   }, [firstName, lastName]);


   const create = () => {
      if (hasValidInput()) {
         const fullName = `${lastName.trim()}, ${firstName.trim()}`;

         if (!names.includes(fullName)) {
            setNames((prevNames) => [...prevNames, fullName]);
            setFirstName("");
            setLastName("");
         }
      }
   };

   const update = () => {
      if (hasValidInput() && selected) {
         const i = names.indexOf(selected);
         if (i !== -1) {
            const newFullName = `${lastName.trim()}, ${firstName.trim()}`;

            const newNames = names.map((name, index) =>
               index === i ? newFullName : name
            );

            setNames(newNames);
            setSelected(newFullName);
         }
      }
   };

   const del = () => {
      if (selected) {
         setNames((prevNames) => prevNames.filter((name) => name !== selected));

         setSelected("");
      }
   };

   return (
      <div>
         <div>
            <input
               value={prefix}
               onChange={(e) => setPrefix(e.target.value)}
               placeholder="Filter prefix"
            />
         </div>

         <select
            size="5"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
         >
            {filteredNames.map((name) => (
               <option key={name} value={name}>
                  {name}
               </option>
            ))}
         </select>

         <div>
            <label>
               Name:
               <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               />
            </label>
            <label>
               Surname:
               <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
               />
            </label>
         </div>

         <div className="buttons">
            <button onClick={create} disabled={!hasValidInput()}>
               Create
            </button>
            <button onClick={update} disabled={!hasValidInput() || !selected}>
               Update
            </button>
            <button onClick={del} disabled={!selected}>
               Delete
            </button>
         </div>
      </div>
   );
}

export default CrudApp;
