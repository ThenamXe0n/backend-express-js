const FilterSidebar = ({
  filters,
  setFilters,
  brands = [],
  categories = [],
  colors = [],
}) => {
  const handleCheckbox = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <aside className="w-11/12 mx-auto min-h-screen max-w-xs rounded-2xl bg-white p-5 shadow-md">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Filters</h2>

      {/* PRICE */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Price Range
        </h3>

        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={150000}
            step={1000}
            value={filters?.price}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            className="w-full accent-black"
          />

          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span className="font-medium text-gray-900">
              ₹{filters.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* BRAND */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Brand</h3>

        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckbox("brand", brand)}
                className="accent-black"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Category</h3>

        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCheckbox("category", category)}
                className="accent-black"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* COLOR */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Color</h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleCheckbox("color", color)}
              className={`h-8 w-8 rounded-full border-2 transition ${
                filters.color.includes(color)
                  ? "border-black scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
