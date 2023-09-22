import { InventoryInterface } from 'interfaces/inventory';
import { OrderInterface } from 'interfaces/order';
import { ReviewInterface } from 'interfaces/review';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  order?: OrderInterface[];
  review?: ReviewInterface[];
  business?: BusinessInterface;
  _count?: {
    inventory?: number;
    order?: number;
    review?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  business_id?: string;
}
