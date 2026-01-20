import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

export default function ProductUploadForm({ setProductList }) {
  const sellerId = JSON.parse(sessionStorage.getItem("userDetail"))._id
  console.log("seller id is ",sellerId)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mrp: "",
    brand: "",
    category: "",
    stock: 1,
    description: "",
    features: "",
    seller: sellerId,
  });

  const [poster, setPoster] = useState(null);
  const [images, setImages] = useState([]);
  const [posterPreview, setPosterPreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (poster) payload.append("poster", poster);

      if (images.length > 0) {
        images.forEach((img) => payload.append("images", img));
      }

      // safely convert features JSON
      if (formData.features) {
        try {
          payload.set(
            "features",
            JSON.stringify(JSON.parse(formData.features))
          );
        } catch {
          alert("Features must be valid JSON");
          return;
        }
      }

      let response = await axiosInstance.post(
        "/api/product/create",
        payload
      );
      let updatedData = response.data.data;
      setProductList((prev) => [...prev, updatedData]);

      toast.success("product uploaded successfully!");
/// reset form data
      setFormData({
        name: "",
        price: "",
        mrp: "",
        brand: "",
        category: "",
        stock: 1,
        description: "",
        features: "",
        seller: "",
      });
      setPosterPreview(null)
    } catch (error) {
      toast.error("failed to upload product");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
          placeholder="Enter product name"
        />
      </div>

      {/* Poster */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Thumbnail (Poster) *
        </label>
        <input
          type="file"
          name="poster"
          onChange={(e) => {
            setPoster(e.target.files[0]);
            let url = URL.createObjectURL(e.target.files[0]);
            setPosterPreview(url);
          }}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>
      {posterPreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={posterPreview}
            alt="Poster Preview"
            className="h-40 rounded-lg border object-contain"
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Additional Images
        </label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Price & MRP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">MRP *</label>
          <input
            type="number"
            name="mrp"
            required
            value={formData.mrp}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Features JSON */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Features (JSON format)
        </label>
        <textarea
          name="features"
          rows="3"
          value={formData.features}
          onChange={handleChange}
          placeholder='e.g. {"color":"red","size":"L"}'
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Seller */}
      {/* <div>
        <label className="block mb-1 font-medium text-gray-700">
          Seller ID *
        </label>
        <input
          type="text"
          name="seller"
          required
          value={formData.seller}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add Product
      </button>
    </form>
  );
}
