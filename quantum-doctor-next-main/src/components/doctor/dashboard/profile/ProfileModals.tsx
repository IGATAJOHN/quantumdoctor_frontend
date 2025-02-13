import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#fffafb] rounded-lg p-6 relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export function AddBankModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-80">
        <h2 className="text-[#141204] text-xl font-medium mb-6">Add Bank Account</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">
              <span className="text-[#d91f11]">*</span> Bank Account
            </label>
            <input
              type="text"
              className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">
              <span className="text-[#d91f11]">*</span> Bank Name
            </label>
            <input
              type="text"
              className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
            />
          </div>
        </div>
        <button className="w-48 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium absolute bottom-6 right-6">
          Add
        </button>
      </div>
    </Modal>
  )
}

export function WithdrawModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-80">
        <h2 className="text-[#141204] text-xl font-medium mb-6">Withdraw Balance</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">
              <span className="text-[#d91f11]">*</span> Amount (min 500)
            </label>
            <input
              type="number"
              min="500"
              className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">
              <span className="text-[#d91f11]">*</span> Password
            </label>
            <input
              type="password"
              className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
            />
          </div>
        </div>
        <button className="w-48 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium absolute bottom-6 right-6">
          Withdraw
        </button>
      </div>
    </Modal>
  )
}

export function ConfirmEmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-60">
        <h2 className="text-[#141204] text-xl font-medium mb-6">Confirm Email</h2>
        <div className="flex flex-col gap-2">
          <label className="text-[#344053] text-sm font-medium">
            <span className="text-[#d91f11]">*</span> Email address
          </label>
          <input
            type="email"
            className="px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
          />
        </div>
        <button className="w-48 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium absolute bottom-6 right-6">
          Proceed
        </button>
      </div>
    </Modal>
  )
}

export function ChangePasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-80">
        <h2 className="text-[#141204] text-xl font-medium mb-6">Enter New Password</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#344053] text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-[#cfd4dc]"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>
        </div>
        <button className="w-48 h-12 px-5 py-4 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium absolute bottom-6 right-6">
          Done
        </button>
      </div>
    </Modal>
  )
}

export function DeleteAccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-40 bg-stone-100 rounded-lg p-4">
        <h2 className="text-[#141204] text-xl font-normal mb-6">
          Are you sure you want to Delete Account?
        </h2>
        <div className="flex justify-center gap-5">
          <button
            onClick={onClose}
            className="w-28 h-12 px-5 py-4 bg-stone-100 rounded-lg border border-[#d0cfcc] text-[#626157] text-base font-medium"
          >
            Back
          </button>
          <button className="w-32 h-12 px-5 py-4 bg-[#d91f11] rounded-lg text-[#fffafb] text-base font-medium">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

