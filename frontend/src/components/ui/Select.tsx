import type { Key } from 'react-aria-components';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

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
      <Button className="inline-flex min-w-[180px] items-center justify-between gap-3 rounded-[25px] border-0 bg-gray-300 px-[18px] py-2.5 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-blue-700">
        <SelectValue>{({ selectedText }) => selectedText || placeholder}</SelectValue>
        <span aria-hidden="true" className="text-[1.1rem] leading-none">▾</span>
      </Button>
      <Popover className="z-[10000] min-w-(--trigger-width) rounded-lg border border-gray-300 bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
        <ListBox className="flex max-h-[260px] flex-col gap-0.5 overflow-auto outline-none">
          {options.map((option) => (
            <ListBoxItem className="cursor-default rounded-md px-3 py-2 data-[focused]:bg-[#e8f0fe] data-[selected]:bg-[#e8f0fe]" id={option.id} key={option.id} textValue={option.label}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
