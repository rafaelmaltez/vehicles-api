import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().max(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
