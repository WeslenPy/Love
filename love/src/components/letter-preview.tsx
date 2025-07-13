"use client"

import { Heart, Edit3, Share2, Star, Gift, Sparkles } from "lucide-react"
import { Button } from "./ui/button"

interface FormData {
  recipientName: string
  openingQuote: string
  mainMessage: string
  closingMessage: string
  finalQuote: string
  promises: Array<{
    icon: string
    title: string
    description: string
  }>
  timeline: Array<{
    title: string
    subtitle: string
    description: string
  }>
}

interface LetterPreviewProps {
  formData: FormData
  onEdit: () => void
  onShare: () => void
  showEditButtons?: boolean
}

export default function LetterPreview({ formData, onEdit, onShare, showEditButtons = true }: LetterPreviewProps) {
  const getTimelineIcon = (index: number) => {
    const icons = [
      <Star key="star" className="w-6 h-6 text-white" />,
      <Heart key="heart" className="w-6 h-6 text-white fill-current" />,
      <Gift key="gift" className="w-6 h-6 text-white" />,
      <Sparkles key="sparkles" className="w-6 h-6 text-white" />,
    ]
    return icons[index % icons.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header */}
      <div className="text-center py-12 px-6">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-pink-500 fill-current animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-pink-600 mb-4">Para {formData.recipientName}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Uma declaração especial para alguém que faz meu coração bater mais forte
        </p>

        {showEditButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={onEdit}
              className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </Button>
            <Button
              onClick={onShare}
              className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
        )}
      </div>

      {/* Carta do Coração */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Carta do Coração</h2>
            <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 italic text-lg">"{formData.openingQuote}"</p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              {formData.mainMessage.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="text-center mb-8">
              <p className="text-pink-600 font-semibold text-xl">{formData.closingMessage} ❤️</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nossa História */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">Nossa História</h2>
          <p className="text-gray-600">Momentos especiais que marcaram nossa jornada</p>
        </div>
        <div className="space-y-6">
          {formData.timeline.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                {getTimelineIcon(index)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full hidden sm:block">{item.subtitle}</span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minhas Promessas */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">Minhas Promessas</h2>
          <p className="text-gray-600">Compromissos do meu coração para você</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formData.promises.map((promise, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{promise.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{promise.title}</h3>
              <p className="text-gray-600">{promise.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mensagem Final */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Eu Te Amo</h2>
          <p className="text-xl mb-2">Mais do que ontem, menos do que amanhã.</p>
          <p className="text-lg mb-6">
            Você é meu presente mais precioso, meu futuro mais desejado, meu amor mais verdadeiro.
          </p>
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-6">
            <p className="text-lg italic text-gray-600">"{formData.finalQuote}"</p>
          </div>
          <div className="flex justify-center gap-2 text-2xl">❤️ 💕 ❤️ 💖 ❤️</div>
        </div>
      </div>

      {/* Footer */}
      {showEditButtons && (
        <div className="text-center pb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onEdit}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            >
              <Edit3 className="w-5 h-5" />
              Personalizar Carta
            </Button>
            <Button
              onClick={onShare}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Carta
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
