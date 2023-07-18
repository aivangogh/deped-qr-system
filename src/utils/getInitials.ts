export default function getInitials(name: string): string {
  const words = name.split(' ');
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
}
