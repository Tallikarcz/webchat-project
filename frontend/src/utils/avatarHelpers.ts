/**
 * Generates initials from a name string
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials in uppercase (e.g., "JD")
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
