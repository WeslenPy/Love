import React, { useState, useEffect } from 'react';
import { Heart, Edit3, Eye, Sparkles, Star, Home, Rainbow, Gift, Share2, Copy, Check } from 'lucide-react';

export default function RomanticLoveLetterGenerator() {

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview]= useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const [formData, setFormData] = useState({
    recipientName: 'Você',
    openingQuote: 'Meu amor, estas palavras vêm do mais profundo do meu coração...',
    mainMessage: 'Desde o primeiro momento em que nossos olhares se cruzaram, soube que você era especial. Há algo em você que ilumina meus dias mais escuros e torna cada momento mais belo. Seu sorriso é como o nascer do sol - sempre consegue aquecer meu coração, não importa quão frio o mundo possa parecer.\n\nVocê não é apenas a pessoa que eu amo, você é meu melhor amigo, meu confidente, minha inspiração. Com você, descobri que o amor verdadeiro não é apenas um sentimento, é uma escolha que faço todos os dias - a escolha de te amar, te respeitar e te valorizar.\n\nQuero construir uma vida ao seu lado, cheia de aventuras, risadas, sonhos compartilhados e momentos simples que se tornam extraordinários apenas por estarmos juntos. Você faz de mim uma pessoa melhor, e por isso sou eternamente grato.',
    closingMessage: 'Eu te amo mais do que as palavras podem expressar.',
    finalQuote: 'Em um mundo cheio de possibilidades, você é minha certeza. Em um universo de estrelas, você é meu sol. Em uma vida de escolhas, você é minha melhor decisão.',
    promises: [
      { icon: '💕', title: 'Amor Incondicional', description: 'Te amar em todos os momentos, nos bons e nos desafiadores, sempre com paciência e compreensão.' },
      { icon: '🤝', title: 'Companheirismo', description: 'Ser seu parceiro em todas as aventuras da vida, apoiando seus sonhos e celebrando suas conquistas.' },
      { icon: '😊', title: 'Alegria Diária', description: 'Fazer você sorrir todos os dias, trazendo leveza e felicidade para nossa vida juntos.' },
      { icon: '⭐', title: 'Crescimento Mútuo', description: 'Crescer ao seu lado, aprendendo e evoluindo juntos como pessoas e como casal.' },
      { icon: '🏠', title: 'Lar Acolhedor', description: 'Construir um lar cheio de amor, onde nos sintamos seguros e felizes para sempre.' },
      { icon: '🌈', title: 'Futuro Brilhante', description: 'Trabalhar todos os dias para construir o futuro dos nossos sonhos, lado a lado.' }
    ],
    timeline: [
      { title: 'Primeiro Encontro', subtitle: 'Um dia especial', description: 'O momento em que nossos caminhos se cruzaram e tudo mudou para sempre.' },
      { title: 'Primeiro "Eu te amo"', subtitle: 'Um momento mágico', description: 'Quando finalmente tivemos coragem de expressar o que nossos corações já sabiam.' },
      { title: 'Momentos Especiais', subtitle: 'Todos os dias', description: 'Cada risada compartilhada, cada abraço, cada momento simples que se tornou precioso.' },
      { title: 'Nosso Futuro', subtitle: 'Para sempre', description: 'Todos os sonhos que ainda vamos realizar juntos, todas as aventuras que nos esperam.' }
    ]
  });




  async function checkKey(){
    const urlParams = new URLSearchParams(window.location.search);
    const keyShare = urlParams.get('share');

    if (keyShare) {
        try {

            const response = await fetch(`http://localhost:3000/s/${keyShare}`,{method:"GET"})

            const data = await response.json()

            setFormData(data);
            setIsEditing(false); 

        } 
        catch (error) {
            setIsEditing(true); 

            console.error('Erro ao decodificar dados da URL:', error);
        }
    }else{

    setIsEditing(true); 
    }
  }


  useEffect(()=>{
    checkKey()

  },[])


  // Função para gerar URL de compartilhamento
    const generateShareUrl = async () => {
        const response = await fetch("http://localhost:3000/share",
            {method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)})


        const data = await response.json()
        console.log(data)

        if (data.key){
            const baseUrl = window.location.origin + window.location.pathname;
            const url = `${baseUrl}?share=${data.key}`;

            setShareUrl(url);
            setShowShareModal(true);
            setIsEditing(false); 
            setPreview(true); 

         }
    };


  // Função para copiar URL para clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePromiseChange = (index, field, value) => {
    const newPromises = [...formData.promises];
    newPromises[index] = { ...newPromises[index], [field]: value };
    setFormData(prev => ({ ...prev, promises: newPromises }));
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData(prev => ({ ...prev, timeline: newTimeline }));
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-pink-500 fill-current" />
            </div>
            <h1 className="text-4xl font-bold text-pink-600 mb-2">Crie Sua Carta do Coração</h1>
            <p className="text-gray-600">Personalize cada detalhe da sua declaração de amor</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid gap-6">
              {/* Informações Básicas */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-pink-700 font-semibold mb-2">Nome do destinatário</label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Para quem é a carta?"
                  />
                </div>
                <div>
                  <label className="block text-pink-700 font-semibold mb-2">Frase de abertura</label>
                  <input
                    type="text"
                    value={formData.openingQuote}
                    onChange={(e) => handleInputChange('openingQuote', e.target.value)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Como você quer começar?"
                  />
                </div>
              </div>

              {/* Mensagem Principal */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Sua mensagem principal</label>
                <textarea
                  value={formData.mainMessage}
                  onChange={(e) => handleInputChange('mainMessage', e.target.value)}
                  rows={8}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Escreva sua declaração de amor..."
                />
              </div>

              {/* Mensagens finais */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-pink-700 font-semibold mb-2">Mensagem de fechamento</label>
                  <input
                    type="text"
                    value={formData.closingMessage}
                    onChange={(e) => handleInputChange('closingMessage', e.target.value)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Como você quer terminar?"
                  />
                </div>
                <div>
                  <label className="block text-pink-700 font-semibold mb-2">Citação final</label>
                  <input
                    type="text"
                    value={formData.finalQuote}
                    onChange={(e) => handleInputChange('finalQuote', e.target.value)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Uma frase especial para finalizar"
                  />
                </div>
              </div>

              {/* Promessas */}
              <div>
                <h3 className="text-pink-700 font-semibold mb-4 text-lg">Suas Promessas</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.promises.map((promise, index) => (
                    <div key={index} className="border border-pink-200 rounded-lg p-4">
                      <div className="flex gap-3 mb-2">
                        <input
                          type="text"
                          value={promise.icon}
                          onChange={(e) => handlePromiseChange(index, 'icon', e.target.value)}
                          className="w-12 text-center p-2 border border-pink-200 rounded"
                          placeholder="🎈"
                        />
                        <input
                          type="text"
                          value={promise.title}
                          onChange={(e) => handlePromiseChange(index, 'title', e.target.value)}
                          className="flex-1 p-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                          placeholder="Título da promessa"
                        />
                      </div>
                      <textarea
                        value={promise.description}
                        onChange={(e) => handlePromiseChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Descrição da promessa"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-pink-700 font-semibold mb-4 text-lg">Nossa História</h3>
                <div className="space-y-4">
                  {formData.timeline.map((item, index) => (
                    <div key={index} className="border border-pink-200 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-3 mb-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                          className="p-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                          placeholder="Título do momento"
                        />
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => handleTimelineChange(index, 'subtitle', e.target.value)}
                          className="p-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                          placeholder="Subtítulo"
                        />
                      </div>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="Descrição do momento"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
              >
                <Eye className="w-5 h-5" />
                Visualizar Carta do Coração
              </button>
              
              <button
                onClick={generateShareUrl}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar Carta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (showShareModal){

    return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Compartilhar Carta</h3>
              <p className="text-gray-600">Copie o link abaixo e envie para sua pessoa amada!</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
                >
                  {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copySuccess ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                💕 Sua carta de amor personalizada será exibida automaticamente quando sua pessoa amada abrir o link!
              </p>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
    </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header */}
      <div className="text-center py-12 px-6">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-pink-500 fill-current animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-pink-600 mb-4">Para {formData.recipientName}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Uma declaração especial para alguém que faz meu coração bater mais forte</p>


        { isEditing || preview ?
            <>
                <button
                onClick={() => setIsEditing(true)}
                className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
                >
                <Edit3 className="w-4 h-4" />
                Editar
                </button>
                
                <button
                onClick={generateShareUrl}
                className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
                >
                <Share2 className="w-4 h-4" />
                Compartilhar
            </button>
            </>
            
            :
            
            <></>
        }
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
              {formData.mainMessage.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
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
                {index === 0 && <Star className="w-6 h-6 text-white" />}
                {index === 1 && <Heart className="w-6 h-6 text-white fill-current" />}
                {index === 2 && <Gift className="w-6 h-6 text-white" />}
                {index === 3 && <Sparkles className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.subtitle}</span>
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
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
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
          <p className="text-lg mb-6">Você é meu presente mais precioso, meu futuro mais desejado, meu amor mais verdadeiro.</p>
          
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-600 italic ">"{formData.finalQuote}"</p>
          </div>
          
          <div className="flex justify-center gap-2 text-2xl">
            ❤️ 💕 ❤️ 💖 ❤️
          </div>
        </div>
      </div>

      {/* Footer */}
    { isEditing || preview ?
            <>
      <div className="text-center pb-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg flex items-center gap-2 mx-auto"
          >
            <Edit3 className="w-5 h-5" />
            Personalizar Carta
          </button>
          
          <button
            onClick={generateShareUrl}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2 mx-auto"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar Carta
          </button>
        </div>
      </div>
            </>:<></>
            
        }

    </div>
  );
}