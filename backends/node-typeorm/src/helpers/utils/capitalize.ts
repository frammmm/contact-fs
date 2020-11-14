export function capitalize (value: string): string {
  if (!value) {
    return value;
  }

  return value[0].toUpperCase() + value.substr(1).toLowerCase();
}
