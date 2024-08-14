"use client"

import { useModalStore } from "@/stores/useModalStore";
import {
    Modal as NextUIModal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@nextui-org/react";

function Modal() {
    const {
        isOpen,
        title,
        body,
        isDismissable,
        maxWidth,
        header,
        hideCloseButton,
        classNames,
        backdrop,
        motionProps,
        footer,
        resetModal,
    } = useModalStore();

    const handleCloseModal = () => {
        resetModal();
    }

    return isOpen && (
        <NextUIModal
            backdrop={backdrop}
            isOpen={isOpen}
            onClose={handleCloseModal}
            isDismissable={isDismissable}
            motionProps={motionProps && motionProps}
            classNames={
                classNames
                    ? classNames
                    : {
                        wrapper: "w-full overflow-hidden items-center",
                        base: `max-h-[90vh] !shadow-card-project min-w-[50%] w-max max-w-[80%] ${maxWidth}`,
                        body: "overflow-y-auto text-task-title",
                        closeButton: "right-5 z-10 text-lg",
                    }
            }
            hideCloseButton={hideCloseButton}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        {header
                            ? header
                            : title && (
                                <ModalHeader className="flex flex-col gap-1 uppercase text-task-title">
                                    {title}
                                </ModalHeader>
                            )}
                        <ModalBody>{body}</ModalBody>
                        {footer}
                    </>
                )}
            </ModalContent>
        </NextUIModal>
    );
}

export default Modal;