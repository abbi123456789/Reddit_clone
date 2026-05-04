/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import type {ReactNode} from 'react';

type Props = Readonly<{
  'data-test-id'?: string;
  children: ReactNode;
}>;

export function DialogButtonsList({children}: Props): JSX.Element {
  return <div className="mt-5 flex flex-col justify-end [&_button]:mb-5">{children}</div>;
}

export function DialogActions({
  'data-test-id': dataTestId,
  children,
}: Props): JSX.Element {
  return (
    <div className="mt-5 flex flex-row justify-end" data-test-id={dataTestId}>
      {children}
    </div>
  );
}
