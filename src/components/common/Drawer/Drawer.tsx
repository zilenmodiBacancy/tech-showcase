import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FC, Fragment } from 'react'

import Button, { ButtonVariant } from '@/components/common/Button/Button'
import Spinner from '@/components/common/Spinner'

import { classNames } from '@/helpers'

interface DrawerProps {
  isOpen: boolean
  onRequestClose: () => void
  title: string
  action: string
  onAction: () => void
  children: React.ReactNode
  className?: string
  buttonLabel?: string
  buttonProps?: {
    type?: 'submit' | 'reset' | 'button' | undefined
    form?: string // Change formId to form
    disabled?: boolean
    hidden?: boolean
  }

  isPending?: boolean
  cancelButtonLabel?: string
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  onRequestClose,
  title,
  action,
  children,
  onAction,
  buttonProps,
  buttonLabel,
  className = '',
  isPending = false,
  cancelButtonLabel = 'Cancel',
}) => (
  <Transition show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onRequestClose}>
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 mt-16">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel
                className={classNames(
                  'pointer-events-auto w-screen max-w-3xl',
                  className
                )}
              >
                <div className="text-foreground flex h-full flex-col divide-y bg-card shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    {/* Header */}
                    <div className="bg-accent px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <DialogTitle className="text-base font-semibold leading-6">
                            {`${action} ${title}`}
                          </DialogTitle>
                        </div>
                        <div className="flex h-7 items-center">
                          <Button
                            type="button"
                            className="text-gray-400 border-none hover:text-gray-500 hover:bg-transparent"
                            onClick={onRequestClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {children}
                  </div>
                  {/* Action buttons */}
                  <div className="flex-shrink-0 border-t border-muted-border px-4 py-5 sm:px-6">
                    <div className="flex justify-end space-x-3">
                      <Button
                        onClick={onRequestClose}
                        name="Cancel"
                        variant={ButtonVariant.Secondary}
                        className="min-w-[6rem]"
                      >
                        {cancelButtonLabel}
                      </Button>
                      {!buttonProps?.hidden && (
                        <Button
                          type={buttonProps?.type}
                          onClick={
                            buttonProps?.type !== 'submit'
                              ? onAction
                              : undefined
                          } // Only use onAction for non-submit types
                          name="action"
                          className="min-w-[6rem] disabled:opacity-20"
                          {...buttonProps}
                        >
                          {isPending ? (
                            <div className="flex w-full justify-center gap-2">
                              <Spinner />
                              <>{buttonLabel ? buttonLabel : action}</>
                            </div>
                          ) : (
                            <>{buttonLabel ? buttonLabel : action}</>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition>
)

export default Drawer
