import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export interface Category {
  id: string;
  name: string;
  icon: string;
  brands?: string[];
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedBrand: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onBrandSelect: (brand: string | null) => void;
}

export function Sidebar({ 
  categories, 
  selectedCategory, 
  selectedBrand,
  onCategorySelect, 
  onBrandSelect 
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    onBrandSelect(null); // Reset brand selection when category changes
    toggleCategory(categoryId);
  };

  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] w-64 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-lg z-40">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Categorías</h2>
        <p className="text-sm text-gray-600 mb-4">Explora por tipo de componente</p>
        
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
          onClick={() => {
            onCategorySelect(null);
            onBrandSelect(null);
          }}
        >
          <span className="mr-2">🏠</span>
          Todos los productos
        </Button>
      </div>

      <ScrollArea className="px-6 py-4 h-[calc(100%-180px)]">
        <div className="space-y-2">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const isSelected = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="space-y-1">
                <Button
                  variant={isSelected ? "secondary" : "ghost"}
                  className={`w-full justify-between group hover:bg-slate-200 transition-all duration-200 ${
                    isSelected ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 border shadow-sm' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  {category.brands && (
                    <div className="ml-auto">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 transition-transform duration-200" />
                      )}
                    </div>
                  )}
                </Button>

                {/* Brand Submenu with smooth animation */}
                {category.brands && isExpanded && (
                  <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
                    {category.brands.map((brand) => (
                      <Button
                        key={brand}
                        variant={selectedBrand === brand ? "secondary" : "ghost"}
                        size="sm"
                        className={`w-full justify-start text-xs hover:bg-slate-200 transition-all duration-200 ${
                          selectedBrand === brand ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 border shadow-sm' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onBrandSelect(selectedBrand === brand ? null : brand);
                        }}
                      >
                        <span className="mr-2 text-blue-500">•</span>
                        <span className={selectedBrand === brand ? 'font-semibold text-blue-700' : ''}>{brand}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Sticky bottom section with summary */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-t border-slate-200">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2">
            {selectedCategory ? `Filtrando por: ${categories.find(c => c.id === selectedCategory)?.name}` : 'Mostrando todas las categorías'}
          </p>
          {selectedBrand && (
            <p className="text-xs text-blue-600 font-semibold">
              Marca: {selectedBrand}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}