export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-destructive flex items-center gap-1" data-error="true">
      <span className="inline-block h-1 w-1 rounded-full bg-destructive" /> {message}
    </p>
  );
}
