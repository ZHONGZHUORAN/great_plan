import React, { useState, useRef, useEffect } from 'react';

interface EditableTagsProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  placeholder?: string;
}

export const EditableTags: React.FC<EditableTagsProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Type a tag...'
}) => {
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing >= 0 && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        onTagsChange([...tags, newTag.trim()]);
      }
      setNewTag('');
    } else if (e.key === 'Backspace' && newTag === '' && tags.length > 0) {
      e.preventDefault();
      onTagsChange(tags.slice(0, -1));
    }
  };

  const handleEditTag = (index: number, newText: string) => {
    const newTags = [...tags];
    newTags[index] = newText;
    onTagsChange(newTags);
  };

  const handleRemoveTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2.5 py-1 bg-notion-bg hover:bg-notion-bg-hover rounded-md text-xs text-notion-text-muted transition-colors flex items-center gap-1"
        >
          {isEditing === index ? (
            <input
              ref={editInputRef}
              type="text"
              value={tag}
              onChange={(e) => handleEditTag(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  setIsEditing(-1);
                }
                if (e.key === 'Backspace' && tag === '') {
                  handleRemoveTag(index);
                  setIsEditing(-1);
                }
              }}
              onBlur={() => setIsEditing(-1)}
              className="bg-transparent border-none outline-none text-xs"
            />
          ) : (
            <span onClick={() => setIsEditing(index)} className="cursor-text">
              {tag}
            </span>
          )}

        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={handleAddTag}
        onFocus={() => {}}
        placeholder={placeholder}
        className="px-2 py-1 bg-transparent border-none outline-none text-xs text-notion-text-muted"
      />
    </div>
  );
};

export default EditableTags;
