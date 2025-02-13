import React, { useState } from 'react'
import { ConfirmEmailModal, ChangePasswordModal, DeleteAccountModal } from './ProfileModals'

export default function AccountTab() {
  const [isConfirmEmailModalOpen, setIsConfirmEmailModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

  return (
    <div className="bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-6">
      <div className="space-y-8">
        <button
          onClick={() => setIsChangePasswordModalOpen(true)}
          className="w-full text-left text-[#3b392d] text-base font-normal"
        >
          Change Password
        </button>
        <button
          onClick={() => setIsDeleteAccountModalOpen(true)}
          className="w-full text-left text-[#3b392d] text-base font-normal"
        >
          Delete Account
        </button>
      </div>

      <ConfirmEmailModal isOpen={isConfirmEmailModalOpen} onClose={() => setIsConfirmEmailModalOpen(false)} />
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} />
      <DeleteAccountModal isOpen={isDeleteAccountModalOpen} onClose={() => setIsDeleteAccountModalOpen(false)} />
    </div>
  )
}

