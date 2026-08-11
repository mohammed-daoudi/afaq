export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName?: string;
  category: string;
  imagePath: string;
  description: string;
  benefits: string[];
  // Prices are only present in B2B context
  price?: number; 
  ppv?: number;
  stock?: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  origin: string;
  description: string;
  color: string;
  logoUrl?: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  type: 'pharmacy' | 'wholesaler' | 'distributor' | 'sales' | 'admin';
  status: 'pending' | 'validated' | 'active';
  creditLimit?: number;
  currentBalance?: number;
}

export interface Order {
  id: string;
  reference: string;
  accountId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'invoiced' | 'paid';
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
