"use client"
import { Heart, Eye, Share2, Plus, Trash2, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

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

interface EditFormProps {
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onPreview: () => void
  onShare: () => void
}

export default function EditForm({ formData, onFormDataChange, onPreview, onShare }: EditFormProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value })
  }

  const handlePromiseChange = (index: number, field: string, value: string) => {
    const newPromises = [...formData.promises]
    newPromises[index] = { ...newPromises[index], [field]: value }
    onFormDataChange({ ...formData, promises: newPromises })
  }

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...formData.timeline]
    newTimeline[index] = { ...newTimeline[index], [field]: value }
    onFormDataChange({ ...formData, timeline: newTimeline })
  }

  const addPromise = () => {
    onFormDataChange({
      ...formData,
      promises: [...formData.promises, { icon: "💖", title: "", description: "" }],
    })
  }

  const removePromise = (index: number) => {
    onFormDataChange({
      ...formData,
      promises: formData.promises.filter((_, i) => i !== index),
    })
  }

  const addTimelineItem = () => {
    onFormDataChange({
      ...formData,
      timeline: [...formData.timeline, { title: "", subtitle: "", description: "" }],
    })
  }

  const removeTimelineItem = (index: number) => {
    onFormDataChange({
      ...formData,
      timeline: formData.timeline.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-rose-500 fill-current animate-pulse" />
              <Sparkles className="w-6 h-6 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Crie Sua Carta do Coração
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Personalize cada detalhe da sua declaração de amor e crie algo verdadeiramente especial
          </p>
        </div>

        <div className="space-y-8">
          {/* Informações Básicas */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-rose-700">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-current" />
                </div>
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-rose-700 font-semibold text-base">
                    Nome do destinatário
                  </Label>
                  <Input
                    id="recipient"
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    className="h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400 text-base"
                    placeholder="Para quem é a carta?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opening" className="text-rose-700 font-semibold text-base">
                    Frase de abertura
                  </Label>
                  <Input
                    id="opening"
                    type="text"
                    value={formData.openingQuote}
                    onChange={(e) => handleInputChange("openingQuote", e.target.value)}
                    className="h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400 text-base"
                    placeholder="Como você quer começar?"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mensagem Principal */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-rose-700">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                Sua Mensagem Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="main-message" className="text-rose-700 font-semibold text-base">
                  Escreva do coração
                </Label>
                <Textarea
                  id="main-message"
                  value={formData.mainMessage}
                  onChange={(e) => handleInputChange("mainMessage", e.target.value)}
                  rows={10}
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400 text-base resize-none"
                  placeholder="Escreva sua declaração de amor... Deixe seus sentimentos fluírem livremente."
                />
              </div>
            </CardContent>
          </Card>

          {/* Mensagens Finais */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-rose-700">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-current" />
                </div>
                Finalização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="closing" className="text-rose-700 font-semibold text-base">
                    Mensagem de fechamento
                  </Label>
                  <Input
                    id="closing"
                    type="text"
                    value={formData.closingMessage}
                    onChange={(e) => handleInputChange("closingMessage", e.target.value)}
                    className="h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400 text-base"
                    placeholder="Como você quer terminar?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="final-quote" className="text-rose-700 font-semibold text-base">
                    Citação final
                  </Label>
                  <Input
                    id="final-quote"
                    type="text"
                    value={formData.finalQuote}
                    onChange={(e) => handleInputChange("finalQuote", e.target.value)}
                    className="h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400 text-base"
                    placeholder="Uma frase especial para finalizar"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promessas */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl text-rose-700">
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💝</span>
                  </div>
                  Suas Promessas
                </CardTitle>
                <Button
                  onClick={addPromise}
                  variant="outline"
                  size="sm"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {formData.promises.map((promise, index) => (
                  <Card key={index} className="border border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Input
                            type="text"
                            value={promise.icon}
                            onChange={(e) => handlePromiseChange(index, "icon", e.target.value)}
                            className="w-16 h-16 text-center text-2xl border-rose-200 focus:border-rose-400"
                            placeholder="💝"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <Input
                            type="text"
                            value={promise.title}
                            onChange={(e) => handlePromiseChange(index, "title", e.target.value)}
                            className="h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400 font-semibold"
                            placeholder="Título da promessa"
                          />
                          <Textarea
                            value={promise.description}
                            onChange={(e) => handlePromiseChange(index, "description", e.target.value)}
                            rows={3}
                            className="border-rose-200 focus:border-rose-400 focus:ring-rose-400 resize-none"
                            placeholder="Descreva sua promessa de amor..."
                          />
                        </div>
                        {formData.promises.length > 1 && (
                          <Button
                            onClick={() => removePromise(index)}
                            variant="ghost"
                            size="sm"
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl text-rose-700">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📖</span>
                  </div>
                  Nossa História
                </CardTitle>
                <Button
                  onClick={addTimelineItem}
                  variant="outline"
                  size="sm"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.timeline.map((item, index) => (
                  <Card key={index} className="border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            {index + 1}
                          </Badge>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleTimelineChange(index, "title", e.target.value)}
                              className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 font-semibold"
                              placeholder="Título do momento"
                            />
                            <Input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => handleTimelineChange(index, "subtitle", e.target.value)}
                              className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                              placeholder="Subtítulo ou data"
                            />
                          </div>
                          <Textarea
                            value={item.description}
                            onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
                            rows={3}
                            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
                            placeholder="Conte sobre esse momento especial..."
                          />
                        </div>
                        {formData.timeline.length > 1 && (
                          <Button
                            onClick={() => removeTimelineItem(index)}
                            variant="ghost"
                            size="sm"
                            className="text-purple-500 hover:text-purple-700 hover:bg-purple-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onPreview}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-base"
            >
              <Eye className="w-5 h-5 mr-2" />
              Visualizar Carta do Coração
            </Button>
            <Button
              onClick={onShare}
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-base bg-transparent"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar Carta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
