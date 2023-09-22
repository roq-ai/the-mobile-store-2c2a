import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  payment_method?: string;
  discount_amount?: number;
  invoice_status?: string;

  _count?: {};
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  payment_method?: string;
  invoice_status?: string;
}
