/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import type {HTMLInputTypeAttribute} from 'react';
import { Input, Label, TextField } from 'react-aria-components';

type Props = Readonly<{
  'data-test-id'?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
}: Props): JSX.Element {
  return (
    <TextField className="mb-2.5 flex flex-row items-center" value={value} onChange={onChange} type={type}>
      <Label className="flex flex-1 text-[#666]">{label}</Label>
      <Input
        type={type}
        className="flex min-w-0 flex-[2] rounded border border-[#999] px-2.5 py-2 text-[16px]"
        placeholder={placeholder}
        data-test-id={dataTestId}
      />
    </TextField>
  );
}
