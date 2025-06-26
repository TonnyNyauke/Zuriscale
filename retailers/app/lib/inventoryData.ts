//lib/inventoryData.ts

export const fetchPOSData = async () => {
  return {
    products: [
      {
        id: 'prod_001',
        name: 'African Print Dress',
        price: 2500,
        stock: 15,
        sku: 'AFR-DR001',
        category: 'dresses',
      },
      {
        id: 'prod_002',
        name: 'Kente Cloth Skirt',
        price: 1800,
        stock: 8,
        sku: 'KEN-SK002',
        category: 'skirts',
      },
      {
        id: 'prod_003',
        name: 'Maasai Beaded Necklace',
        price: 800,
        stock: 22,
        sku: 'MAA-NK003',
        category: 'accessories',
      },
      {
        id: 'prod_004',
        name: 'Kitenge Headwrap',
        price: 600,
        stock: 3,
        sku: 'KIT-HW004',
        category: 'accessories',
      },
    ],
    categories: [
      { id: 'dresses', name: 'Dresses', productCount: 12 },
      { id: 'skirts', name: 'Skirts', productCount: 8 },
      { id: 'shirts', name: 'Shirts', productCount: 15 },
      { id: 'accessories', name: 'Accessories', productCount: 20 },
    ]
  };
};

export const fetchInventoryData = async () => {
  const data = await fetchPOSData();
  return {
    products: data.products,
    lowStockItems: data.products.filter(p => p.stock < 5),
    categories: [
      { name: 'Dresses', count: 12 },
      { name: 'Skirts', count: 8 },
      { name: 'Shirts', count: 15 },
      { name: 'Accessories', count: 20 },
    ]
  };
};

export const fetchShopData = async () => {
  return fetchPOSData();
};

export const fetchProductDetail = async (id: string) => {
  const { products } = await fetchPOSData();
  return products.find(p => p.id === id) || null;
};