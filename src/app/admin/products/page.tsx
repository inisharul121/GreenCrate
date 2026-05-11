"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  X,
  Edit,
  Trash2,
  ExternalLink,
  Package,
  AlertCircle
} from "lucide-react";
import { api } from "@/lib/api";
import { formatPrice, cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_name: "fruits",
    image: "",
    weekly: "",
    biweekly: "",
    monthly: "",
  });

  async function fetchProducts() {
    try {
      const data = await api.products.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["All", "Fruits", "Catering", "Gifts"];
  
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || p.category_name.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="p-8 text-charcoal/40">Loading products...</div>;

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      await api.products.create({
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        category_name: newProduct.category_name,
        image: newProduct.image,
        subscriptionPrices: {
          weekly: newProduct.weekly ? Number(newProduct.weekly) : undefined,
          biweekly: newProduct.biweekly ? Number(newProduct.biweekly) : undefined,
          monthly: newProduct.monthly ? Number(newProduct.monthly) : undefined,
        },
      });
      setShowCreateModal(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category_name: "fruits",
        image: "",
        weekly: "",
        biweekly: "",
        monthly: "",
      });
      await fetchProducts();
    } catch (error: any) {
      setCreateError(error?.message || "Failed to create product");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Inventory Management</h2>
          <p className="text-charcoal/40 font-medium">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary py-3 px-6 shadow-xl hover:shadow-forest/20"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-forest transition-colors" />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-sage/10 focus:outline-none focus:border-forest/30 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                filter === c 
                  ? "bg-forest text-white shadow-md" 
                  : "bg-white text-charcoal/40 hover:text-charcoal border border-sage/10"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-[2.5rem] shadow-premium border border-sage/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-forest/5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">
                <th className="px-8 py-6">Product Info</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Price (Base)</th>
                <th className="px-8 py-6">Stock</th>
                <th className="px-8 py-6">Rating</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {filteredProducts.map((product, i) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream/30 border border-sage/5 relative">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{product.name}</p>
                        <p className="text-[10px] text-charcoal/30 font-medium truncate max-w-[150px]">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full bg-sage/10 text-forest text-[10px] font-bold uppercase tracking-wider">
                      {product.category_label}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-charcoal">{formatPrice(product.price)}</p>
                    <p className="text-[10px] text-forest/50 font-bold uppercase">Sub: {formatPrice(product.subscriptionPrices?.weekly || 0)}</p>
                  </td>
                  <td className="px-8 py-5">
                    {product.in_stock ? (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span className="text-[10px] font-bold uppercase">In Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-rose-500">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">Out of Stock</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="text-sm font-bold">{product.rating}</span>
                      <Package className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/product/${product.id}`} target="_blank" className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-forest transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-blue-500 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-rose-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sage/10 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal">Add Product</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg text-charcoal/40 hover:bg-sage/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
                <select
                  value={newProduct.category_name}
                  onChange={(e) => setNewProduct((p) => ({ ...p, category_name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-white"
                >
                  <option value="fruits">Fruits</option>
                  <option value="catering">Catering</option>
                  <option value="gifts">Gifts</option>
                </select>
              </div>

              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 min-h-24"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Base price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
                <input
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct((p) => ({ ...p, image: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Weekly price"
                  value={newProduct.weekly}
                  onChange={(e) => setNewProduct((p) => ({ ...p, weekly: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Biweekly price"
                  value={newProduct.biweekly}
                  onChange={(e) => setNewProduct((p) => ({ ...p, biweekly: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Monthly price"
                  value={newProduct.monthly}
                  onChange={(e) => setNewProduct((p) => ({ ...p, monthly: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20"
                />
              </div>

              {createError ? <p className="text-sm text-rose-500 font-medium">{createError}</p> : null}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-sage/20 text-charcoal/60 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? "Creating..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
