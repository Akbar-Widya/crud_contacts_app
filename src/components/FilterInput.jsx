const FilterInput = ({ prefix, onPrefixChange }) => {
   return (
      <div>
         <label className="text-sm font-medium block text-gray-700">
            Filter prefix
         </label>
         <input
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            className="block p-1 border border-gray-300 rounded-sm text-base w-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
         />
      </div>
   );
};
export default FilterInput;
