interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'Manager', 'Employee', 'Supplier', 'Customer'],
  tenantName: 'Business',
  applicationName: 'the mobile store v1',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Read product information', 'Place orders', 'Write product reviews', 'Read business information'],
  ownerAbilities: [
    'Manage users',
    'Manage invoices',
    'Manage businesses',
    'Manage products',
    'Manage orders',
    'Manage inventory',
    'Manage reviews',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/f9f774ad-672a-4a82-89a0-836fa7681f6d',
};
