import React, { useState } from 'react'
import { AddBankModal, WithdrawModal } from './ProfileModals'

export default function PaymentTab() {
  const [transactions] = useState([
    { amount: 5000, type: 'credit', date: '25-11-24', time: '1:01 pm' },
    { amount: 5000, type: 'credit', date: '25-11-24', time: '1:01 pm' },
    { amount: 10000, type: 'debit', date: '25-11-24', time: '1:01 pm' },
    { amount: 5000, type: 'credit', date: '25-11-24', time: '1:01 pm' },
  ])

  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="w-[680px] h-[130px] bg-gradient-to-l from-[#004ba8] to-[#418ae3] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div>
            <p className="text-blue-50 text-base">Balance</p>
            <p className="text-[#fffafb] text-2xl font-medium">₦5,000</p>
          </div>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-28 h-8 px-5 py-2 bg-[#fffafb] rounded-lg text-[#3b392d] text-base font-medium self-end"
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="w-[400px] flex justify-between items-center bg-blue-50 rounded-lg border border-[#d0cfcc] p-4">
        <p className="text-[#626157] text-base">Add Account Number</p>
        <button
          onClick={() => setIsAddBankModalOpen(true)}
          className="w-24 h-8 px-5 py-2 bg-[#004ba8] rounded-lg text-[#fffafb] text-base font-medium"
        >
          Add
        </button>
      </div>

      <div>
        <h2 className="text-[#3b392d] text-xl font-medium mb-4">Transaction History</h2>
        <div className="w-[600px] bg-[#fffafb] rounded-lg border border-[#d0cfcc] p-6 space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-start">
              <p className={`text-lg font-medium ${transaction.type === 'credit' ? 'text-[#60b516]' : 'text-[#ed7753]'}`}>
                {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
              </p>
              <div className="text-right">
                <p className="text-[#626157] text-base">{transaction.date}</p>
                <p className="text-[#b0b0ab] text-sm">{transaction.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddBankModal isOpen={isAddBankModalOpen} onClose={() => setIsAddBankModalOpen(false)} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
    </div>
  )
}

