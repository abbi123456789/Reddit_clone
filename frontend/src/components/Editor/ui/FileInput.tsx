/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';
import { Input, Label } from 'react-aria-components';

type Props = Readonly<{
  'data-test-id'?: string;
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

export default function FileInput({
  accept,
  label,
  onChange,
  'data-test-id': dataTestId,
}: Props): JSX.Element {
  return (
    <div className="mb-2.5 flex flex-row items-center">
      <Label className="flex flex-1 text-[#666]" htmlFor={dataTestId}>{label}</Label>
      <Input
        id={dataTestId}
        type="file"
        accept={accept}
        className="flex min-w-0 flex-[2] rounded border border-[#999] px-2.5 py-2 text-[16px]"
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
      />
    </div>
  );
}
