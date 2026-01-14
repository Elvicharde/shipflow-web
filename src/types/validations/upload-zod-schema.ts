import { z } from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const uploadCsvSchema = z.object({
  file: z
    .custom<File>((file) => file instanceof File, 'File is required')
    .refine(
      (file) => file?.type === 'text/csv' || file?.name.endsWith('.csv'),
      {
        message: 'Only CSV files are allowed',
      },
    )
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: 'File size must be less than 10MB',
    }),
});

export type UploadCsvSchema = z.infer<typeof uploadCsvSchema>;
