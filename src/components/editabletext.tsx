import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  onEnter?: () => void;
  onBackspaceEmpty?: () => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  placeholder = 'Type something...',
  className = '',
  onEnter,
  onBackspaceEmpty,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      onChange(tempValue);
      onEnter?.();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value);
    } else if (e.key === 'Backspace' && tempValue === '') {
      e.preventDefault();
      onBackspaceEmpty?.();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full bg-transparent border-none outline-none text-inherit ${className}`}
        style={{ minWidth: '1ch' }}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-notion-accent/10 rounded px-1 ${className}`}
      title="Click to edit"
    >
      {value || <span className="text-notion-text-muted italic">{placeholder}</span>}
    </span>
  );
};

export default EditableText;
