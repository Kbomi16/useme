"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { useModal } from "@workspace/hooks/useModal"

import Modal from "@/components/common/Modal"

export default function ModalPreview() {
  const [isOpen, setIsOpen] = useState(false)

  const { openModal } = useModal()

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    setIsOpen(false)
  }

  const handleOpenConfirm = () => {
    void openModal({
      title: "삭제할까요?",
      content: "이 작업은 되돌릴 수 없습니다.",
      variant: "destructive",
      actionText: "삭제",
    })
  }

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        모달 미리보기
      </Button>
      <Button type="button" variant="outline" onClick={handleOpenConfirm}>
        확인 모달
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="공통 모달"
        description="전체 화면 전환과 확인, 취소를 확인할 수 있습니다."
      >
        <p>
          web과 admin에서 같이 쓰는 모달입니다. 작은 화면에서는 처음부터 전체
          화면으로 열리고, 큰 화면에서는 가운데 카드로 뜹니다.
        </p>
      </Modal>
    </>
  )
}
