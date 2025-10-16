export const productOptions: ProductType[] = [
  { label: "20g - ₦1,500 (Pouch)", value: "20g", price: 1500 },
  { label: "50g - ₦2,000 (Pouch)", value: "50g", price: 2000 },
  { label: "100g - ₦2,500 (Pouch)", value: "100g", price: 2500 },
  { label: "800g - ₦3,500 (Jar)", value: "800g", price: 3500 },
  { label: "1L - ₦4,000 (Jar)", value: "1L", price: 4000 },
  { label: "1.5L - ₦5,500 (Jar)", value: "1.5L", price: 5500 },
  { label: "2.5L - ₦8,000 (Jar)", value: "2.5L", price: 8000 },
];

export interface ProductType {
  label: string;
  value: string;
  price: number;
}

export interface SaleItem {
  id: string;
  product: ProductType;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  quantity: number;
  unitPrice: number;
  total: number;
}
