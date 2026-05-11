import type { DeliveryZone } from "@/types";

const ZONES: DeliveryZone[] = [
  // Dhaka Zones
  { zip: "1212", city: "Gulshan, Dhaka",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1213", city: "Banani, Dhaka",         available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1230", city: "Uttara, Dhaka",         available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1205", city: "Dhanmondi, Dhaka",      available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1000", city: "Motijheel, Dhaka",      available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1208", city: "Tejgaon, Dhaka",        available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1206", city: "Cantonment, Dhaka",     available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  { zip: "1207", city: "Mohammadpur, Dhaka",    available: true,  nextDelivery: "Tomorrow, by 8:00 AM", cutoffTime: "Today 14:00" },
  
  // Chattogram Zones
  { zip: "4000", city: "Agrabad, Chattogram",   available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  { zip: "4100", city: "GEC, Chattogram",       available: true,  nextDelivery: "In 2 days, by 8:00 AM", cutoffTime: "Today 12:00" },
  
  // Unavailable/Coming Soon
  { zip: "6000", city: "Rajshahi",              available: false },
  { zip: "7000", city: "Khulna",                available: false },
  { zip: "3100", city: "Sylhet",                available: false },
];

export async function checkDeliveryZone(zip: string): Promise<DeliveryZone | null> {
  return ZONES.find((z) => z.zip === zip.trim()) ?? null;
}
