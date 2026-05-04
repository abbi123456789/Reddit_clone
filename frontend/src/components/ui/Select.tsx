import type { Key } from 'react-aria-components';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import './Select.css';

export type SelectOption = {
  id: string;
  label: string;
};

type AriaSelectProps = {
  ariaLabel: string;
  className?: string;
  name?: string;
  onSelectionChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  selectedKey: string;
};

export function AriaSelect({
  ariaLabel,
  className,
  name,
  onSelectionChange,
  options,
  placeholder,
  selectedKey,
}: AriaSelectProps) {
  return (
    <Select
      aria-label={ariaLabel}
      className={className}
      name={name}
      selectedKey={selectedKey || null}
      onSelectionChange={(key: Key | null) => {
        if (key !== null) {
          onSelectionChange(String(key));
        }
      }}
    >
      <Button className="aria-select-trigger">
        <SelectValue>{({ selectedText }) => selectedText || placeholder}</SelectValue>
        <span aria-hidden="true" className="aria-select-indicator">▾</span>
      </Button>
      <Popover className="aria-select-popover">
        <ListBox className="aria-select-listbox">
          {options.map((option) => (
            <ListBoxItem id={option.id} key={option.id} textValue={option.label}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
