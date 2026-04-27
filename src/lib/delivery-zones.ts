import type { DeliveryZone } from "@/types";

const ZONES: DeliveryZone[] = [
  { zip: "8001", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8002", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8003", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8004", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8005", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8006", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8008", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8032", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8048", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "8050", city: "Zürich",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "3000", city: "Bern",          available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "3001", city: "Bern",          available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "3011", city: "Bern",          available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "3012", city: "Bern",          available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "4000", city: "Basel",         available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "4001", city: "Basel",         available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "4051", city: "Basel",         available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "1000", city: "Lausanne",      available: true,  nextDelivery: "In 3 days, by 8:00 AM", cutoffTime: "Today 10:00" },
  { zip: "1200", city: "Geneva",        available: true,  nextDelivery: "In 3 days, by 8:00 AM", cutoffTime: "Today 10:00" },
  { zip: "1201", city: "Geneva",        available: true,  nextDelivery: "In 3 days, by 8:00 AM", cutoffTime: "Today 10:00" },
  { zip: "6000", city: "Lucerne",       available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "6003", city: "Lucerne",       available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "9000", city: "St. Gallen",    available: false },
  { zip: "7000", city: "Chur",          available: false },
];

export async function checkDeliveryZone(zip: string): Promise<DeliveryZone | null> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));
  return ZONES.find((z) => z.zip === zip.trim()) ?? null;
}
