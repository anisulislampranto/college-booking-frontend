'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

export default function Modal({ open, setOpen, children }) {

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden border shadow-2xl border-black bg-white px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
                {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
