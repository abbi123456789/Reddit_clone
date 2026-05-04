/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import './Input.css';

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
    <TextField className="Input__wrapper" value={value} onChange={onChange} type={type}>
      <Label className="Input__label">{label}</Label>
      <Input
        type={type}
        className="Input__input"
        placeholder={placeholder}
        data-test-id={dataTestId}
      />
    </TextField>
  );
}
