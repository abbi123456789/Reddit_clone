/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import type {ReactNode} from 'react';
import { Button as AriaButton } from 'react-aria-components';

import joinClasses from '../utils/joinClasses';

export default function Button({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title,
}: {
  'data-test-id'?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  small?: boolean;
  title?: string;
}): JSX.Element {
  return (
    <AriaButton
      isDisabled={disabled}
      className={joinClasses(
        'rounded border-0 bg-[#eee] px-[15px] py-2.5 text-[14px] hover:bg-[#ddd]',
        disabled && 'cursor-not-allowed hover:bg-[#eee]',
        small && 'px-2.5 py-1 text-[13px]',
        className,
      )}
      onPress={onClick}
      aria-label={title}
      {...(dataTestId && {'data-test-id': dataTestId})}>
      {children}
    </AriaButton>
  );
}
