/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import {isDOMNode} from 'lexical';
import type { ReactNode } from 'react';
import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import { Button, Dialog } from 'react-aria-components';

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  title: string;
}) {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        isDOMNode(target) &&
        !modalRef.current.contains(target) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex shrink grow-0 flex-col items-center justify-center bg-[rgba(40,40,40,0.6)]">
      <Dialog className="relative flex min-h-[100px] min-w-[300px] grow-0 flex-col rounded-[10px] bg-white p-5 shadow-[0_0_20px_0_#444]" aria-label={title} ref={modalRef}>
        <h2 className="m-0 border-b border-gray-300 pb-2.5 text-[#444]">{title}</h2>
        <Button
          className="absolute right-5 flex h-[30px] w-[30px] items-center justify-center rounded-[20px] border-0 bg-[#eee] text-center hover:bg-[#ddd]"
          aria-label="Close modal"
          type="button"
          onPress={onClose}>
          X
        </Button>
        <div className="pt-5">{children}</div>
      </Dialog>
    </div>
  );
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  title: string;
}): JSX.Element {
  return createPortal(
    <PortalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  );
}
