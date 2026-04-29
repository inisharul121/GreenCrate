"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
  Package,
  AlertCircle
} from "lucide-react";
import { allProducts } from "@/lib/products";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Fruits", "Catering", "Gifts"];
  
  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || p.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Inventory Management</h2>
          <p className="text-charcoal/40 font-medium">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <button className="btn-primary py-3 px-6 shadow-xl hover:shadow-forest/20">
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
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream/30 border border-sage/5">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{product.name}</p>
                        <p className="text-[10px] text-charcoal/30 font-medium truncate max-w-[150px]">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full bg-sage/10 text-forest text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-charcoal">{formatPrice(product.price)}</p>
                    <p className="text-[10px] text-forest/50 font-bold uppercase">Sub: {formatPrice(product.subscriptionPrices.weekly)}</p>
                  </td>
                  <td className="px-8 py-5">
                    {product.inStock ? (
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
    </div>
  );
}
