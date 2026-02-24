import { useState, useRef, useEffect, ReactNode } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { Pencil } from "lucide-react";

interface EditableTextProps {
  /** The text content to display */
  children: ReactNode;
  /** Unique key for saving (e.g. "hero_titulo") */
  storageKey: string;
  /** Which table to save to */
  table?: "platform_texts" | "landing_config";
  /** Section for landing_config or platform_texts */
  section?: string;
  /** Field name within landing_config conteudo JSON */
  field?: string;
  /** Tag to render (h1, h2, p, span) */
  as?: keyof JSX.IntrinsicElements;
  /** Additional className */
  className?: string;
  /** Whether this is multiline */
  multiline?: boolean;
  /** Current dynamic value from hook (overrides children when available) */
  value?: string;
}

export const EditableText = ({
  children,
  storageKey,
  table = "platform_texts",
  section = "geral",
  field,
  as: Tag = "span",
  className = "",
  multiline = false,
  value,
}: EditableTextProps) => {
  const { isEditMode, addChange, pendingChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const changeKey = `${table}:${storageKey}`;
  const pendingValue = pendingChanges.get(changeKey)?.value as string | undefined;
  const displayValue = value ?? (typeof children === "string" ? children : "");
  const visualValue = pendingValue ?? displayValue;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!isEditMode) return;
    setLocalValue(visualValue);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (localValue !== displayValue) {
      addChange(changeKey, {
        table,
        key: storageKey,
        field: field || storageKey,
        value: localValue,
        section,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) handleSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  if (!isEditMode) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (isEditing) {
    const inputClass = `w-full bg-accent/20 border-2 border-accent rounded-lg px-3 py-2 text-foreground outline-none focus:border-primary transition-colors ${className}`;

    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={inputClass}
        rows={3}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={inputClass}
      />
    );
  }

  return (
    <Tag
      onClick={handleClick}
      className={`${className} relative cursor-pointer group/edit`}
    >
      {pendingValue !== undefined ? pendingValue : children}
      <span className="absolute -top-2 -right-2 opacity-0 group-hover/edit:opacity-100 transition-opacity bg-accent text-accent-foreground rounded-full p-1 shadow-sm">
        <Pencil size={10} />
      </span>
      <span className="absolute inset-0 rounded border-2 border-dashed border-accent/40 opacity-0 group-hover/edit:opacity-100 transition-opacity pointer-events-none" />
    </Tag>
  );
};
