/**
 * Utility functions for class name management
 */

/**
 * Combines multiple class names, filtering out falsy values
 * @param classes - Array of class names, booleans, null, or undefined values
 * @returns A string with all valid class names joined by spaces
 * 
 * @example
 * ```tsx
 * className={cn(
 *   "base-class",
 *   isActive && "active-class",
 *   variant === "primary" && "primary-class"
 * )}
 * ```
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
  