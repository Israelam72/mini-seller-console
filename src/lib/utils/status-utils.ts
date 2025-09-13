export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'bg-blue-500'
    case 'contacted':
      return 'bg-yellow-500'
    case 'qualified':
      return 'bg-green-500'
    case 'unqualified':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}
