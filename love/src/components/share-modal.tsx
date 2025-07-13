"use client"

import { useState } from "react"
import { Share2, Copy, Check, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ShareModalProps {
  shareUrl: string
  onClose: () => void
}

export default function ShareModal({ shareUrl, onClose }: ShareModalProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Compartilhar Carta</h3>
          <p className="text-gray-600">Copie o link abaixo e envie para sua pessoa amada!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 border-none focus:ring-0"
            />
            <Button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
            >
              {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copySuccess ? "Copiado!" : "Copiar"}
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            💕 Sua carta de amor personalizada será exibida automaticamente quando sua pessoa amada abrir o link!
          </p>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
