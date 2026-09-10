import React from 'react';
import prisma from '@/lib/prisma';
import CustomerManagementClient, { AdminCustomerItem } from '@/components/admin/CustomerManagementClient';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      bookings: {
        orderBy: { eventDate: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCustomers: AdminCustomerItem[] = customers.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    whatsapp: c.whatsapp,
    notes: c.notes,
    createdAt: c.createdAt.toISOString(),
    bookings: c.bookings.map((b) => ({
      id: b.id,
      eventType: b.eventType,
      eventDate: b.eventDate.toISOString(),
      dateString: b.dateString,
      status: b.status,
      venue: b.venue,
      city: b.city,
      totalAmount: b.totalAmount,
    })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400">
            Client Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Customer CRM & History
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Track past hosts, repeated clients, event counts, and direct communication logs.
          </p>
        </div>
      </div>

      <CustomerManagementClient initialCustomers={formattedCustomers} />
    </div>
  );
}
