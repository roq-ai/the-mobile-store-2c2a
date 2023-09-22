import axios from 'axios';
import queryString from 'query-string';
import { InvoiceInterface, InvoiceGetQueryInterface } from 'interfaces/invoice';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInvoices = async (query?: InvoiceGetQueryInterface): Promise<PaginatedInterface<InvoiceInterface>> => {
  const response = await axios.get('/api/invoices', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInvoice = async (invoice: InvoiceInterface) => {
  const response = await axios.post('/api/invoices', invoice);
  return response.data;
};

export const updateInvoiceById = async (id: string, invoice: InvoiceInterface) => {
  const response = await axios.put(`/api/invoices/${id}`, invoice);
  return response.data;
};

export const getInvoiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/invoices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInvoiceById = async (id: string) => {
  const response = await axios.delete(`/api/invoices/${id}`);
  return response.data;
};
