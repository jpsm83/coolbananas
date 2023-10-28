import React, { useState, useEffect } from "react";

interface IngredientsInputProps {
  id: string;
  disabled?: boolean;
  onSave: (ingredient: {
    name: string;
    unit: string;
    quantity: number;
  }) => void;
}

const IngredientsInput: React.FC<IngredientsInputProps> = ({
  id,
  disabled,
  onSave,
}) => {
  const [ingredientData, setIngredientData] = useState({
    name: "",
    unit: "Unit",
    quantity: 0.25,
  });

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  useEffect(() => {
    const { name, quantity } = ingredientData;
    setIsSaveButtonDisabled(!name || quantity < 0.25);
  }, [ingredientData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;
    setIngredientData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleAddClick = () => {
    if (ingredientData.name && ingredientData.unit && ingredientData.quantity) {
      onSave({
        name: ingredientData.name,
        unit: ingredientData.unit,
        quantity: ingredientData.quantity,
      });
      setIngredientData({
        name: "",
        unit: "Unit",
        quantity: 0.25,
      });
    }
  };

  return (
    <div>
      <div className="w-full relative">
        <textarea
          rows={2}
          id={`ingredient-${id}`}
          maxLength={1000}
          disabled={disabled}
          name="name"
          value={ingredientData.name}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black"
        />
        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400">
          Ingredient
        </label>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <div className="w-full relative">
          <select
            id={`units-${id}`}
            name="unit"
            value={ingredientData.unit}
            onChange={handleChange}
            className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black"
          >
            <option value="To taste">To taste</option>
            <option value="Cups">Cups</option>
            <option value="Dash">Dash</option>
            <option value="Galon">Galon</option>
            <option value="Grams">Grams</option>
            <option value="Kilos">Kilos</option>
            <option value="Libra">Libra</option>
            <option value="Liters">Liters</option>
            <option value="Milliliter">Milliliter</option>
            <option value="Onces">Onces</option>
            <option value="Piece">Piece</option>
            <option value="Pinche">Pinche</option>
            <option value="Pint">Pint</option>
            <option value="Pounds">Pounds</option>
            <option value="Slice">Slice</option>
            <option value="Tablespoons">Tablespoons</option>
            <option value="Teaspoons">Teaspoons</option>
            <option value="Unit">Unit</option>
          </select>
        </div>
        <div className="w-full relative">
          <input
            id={`quantity-${id}`}
            disabled={disabled}
            name="quantity"
            value={ingredientData.quantity}
            onChange={handleChange}
            placeholder=" "
            type="number"
            min={0.25}
            max={1000}
            step={0.25}
            className="peer w-full text-right p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black"
          />{" "}
          <label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400">
            Quantity
          </label>
        </div>
        <button
          onClick={handleAddClick}
          disabled={isSaveButtonDisabled}
          className={`relative w-40 rounded-lg text-xl font-bold text-white transition ${
            isSaveButtonDisabled
              ? "bg-gray-500 opacity-80 hover:opacity-100 cursor-not-allowed"
              : "bg-green-800 opacity-80 hover:opacity-100 cursor-pointer"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default IngredientsInput;
