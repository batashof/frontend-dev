import { format, parseISO } from 'date-fns';

/**
 * Преобразует дату в формате ISO 8601 в читаемый формат.
 * @param isoDate - Дата в формате ISO 8601 (например, "2025-02-17T21:11:48Z").
 * @param dateFormat - Формат даты (по умолчанию "dd.MM.yyyy HH:mm").
 * @returns Отформатированная дата.
 */
export const formatDate = (isoDate: string, dateFormat: string = 'dd.MM.yyyy HH:mm'): string => {
  return format(parseISO(isoDate), dateFormat);
};
