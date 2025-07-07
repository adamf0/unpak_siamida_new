import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "iiii, dd MMMM yyyy", { locale: id });
};