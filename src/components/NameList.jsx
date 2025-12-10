function NameList({ names, selected, onSelectChange, className }) {
  return (
    // Apply className="flex-1" here
    <div className={className}> 
        <select 
          size="5" 
          value={selected} 
          onChange={(e) => onSelectChange(e.target.value)}
          // IMPORTANT: w-full makes the select element stretch to fill the flex-1 space
          className="w-full text-base border border-gray-400 mb-4 focus:outline-none focus:border-blue-500 bg-white"
        >
          {names.map((name) => (
            <option 
              key={name} 
              value={name}
              className="p-1"
            >
              {name}
            </option>
          ))}
        </select>
    </div>
  );
}

export default NameList;