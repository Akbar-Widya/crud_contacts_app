const NameList = ({ names, selected, onSelectChange }) => {
   return (
      <div>
         <select
            size="5"
            value={selected}
            onChange={(e) => onSelectChange(e.target.value)}
            className="w-full text-base border border-gray-400 mb-4 focus:outline-none focus:border-blue-500 bg-white"
         >
            {names.map((name) => (
               <option key={name} value={name} className="p-1">
                  {name}
               </option>
            ))}
         </select>
      </div>
   );
};
export default NameList;
