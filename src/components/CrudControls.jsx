function CrudControls({ 
  firstName, 
  lastName, 
  onFirstNameChange, 
  onLastNameChange,
  onCreate, 
  onUpdate, 
  onDelete,
  isValid,
  hasSelection
}) {
  // Common input and button styles
  const inputClasses = "p-1 border border-gray-300 rounded-sm text-base w-full ml-1 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const baseButtonClasses = "px-3 py-1 text-sm rounded transition ease-in-out duration-150 font-medium";
  
  // Color-coded button styles
  const createClasses = "bg-green-500 text-white hover:bg-green-600";
  const updateClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const deleteClasses = "bg-red-500 text-white hover:bg-red-600";
  const disabledClasses = 'bg-gray-200 text-gray-500 cursor-not-allowed';

  return (
    <div className="flex flex-col space-y-4 pt-1 max-w-sm w-full">
      
      {/* Name and Surname Container */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700 grid grid-cols-[80px_1fr]">
          Name: 
          <input 
            value={firstName} 
            onChange={(e) => onFirstNameChange(e.target.value)}
            className={inputClasses}
          />
        </label>
        <label className="text-sm font-medium text-gray-700 grid grid-cols-[80px_1fr]">
          Surname: 
          <input 
            value={lastName} 
            onChange={(e) => onLastNameChange(e.target.value)}
            className={inputClasses}
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="space-x-2"> 
        <button 
          onClick={onCreate} 
          disabled={!isValid}
          className={`${baseButtonClasses} ${isValid ? createClasses : disabledClasses}`}
        >
          Create
        </button>
        <button 
          onClick={onUpdate} 
          disabled={!isValid || !hasSelection}
          className={`${baseButtonClasses} ${(isValid && hasSelection) ? updateClasses : disabledClasses}`}
        >
          Update
        </button>
        <button 
          onClick={onDelete} 
          disabled={!hasSelection}
          className={`${baseButtonClasses} ${hasSelection ? deleteClasses : disabledClasses}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CrudControls;