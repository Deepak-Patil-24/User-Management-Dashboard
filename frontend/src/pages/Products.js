import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../services/api";

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/products", { params: filters });
      setProducts(response.data.products);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts(); // Refresh the list
      } catch (error) {
        setError("Failed to delete product");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Products</h1>
        <Link to="/products/new" className="btn btn-custom">
          + Add New Product
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="card card-custom mb-4">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <select
                name="category"
                className="form-select"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                onClick={() => setFilters({ search: "", category: "all" })}
                className="btn btn-outline-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Products List */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card card-custom h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">
                    {product.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">${product.price}</span>
                    <span className="badge bg-secondary">
                      {product.category}
                    </span>
                  </div>

                  <div className="d-grid gap-1">
                    <Link
                      to={`/products/${product._id}/edit`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card card-custom">
          <div className="card-body text-center py-5">
            <h3>No products found</h3>
            <p className="text-muted">
              {filters.search || filters.category !== "all"
                ? "Try changing your filters"
                : "You haven't added any products yet."}
            </p>
            <Link to="/products/new" className="btn btn-custom">
              Add Your First Product
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
