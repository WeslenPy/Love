import { useState, useEffect } from "react"
import EditForm from "./components/edit-form"
import LetterPreview from "./components/letter-preview"
import ShareModal from "./components/share-modal"

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

export default function RomanticLoveLetterGenerator() {
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  const [formData, setFormData] = useState<FormData>({
    recipientName: "Você",
    openingQuote: "Meu amor, estas palavras vêm do mais profundo do meu coração...",
    mainMessage:
      "Desde o primeiro momento em que nossos olhares se cruzaram, soube que você era especial. Há algo em você que ilumina meus dias mais escuros e torna cada momento mais belo. Seu sorriso é como o nascer do sol - sempre consegue aquecer meu coração, não importa quão frio o mundo possa parecer.\n\nVocê não é apenas a pessoa que eu amo, você é meu melhor amigo, meu confidente, minha inspiração. Com você, descobri que o amor verdadeiro não é apenas um sentimento, é uma escolha que faço todos os dias - a escolha de te amar, te respeitar e te valorizar.\n\nQuero construir uma vida ao seu lado, cheia de aventuras, risadas, sonhos compartilhados e momentos simples que se tornam extraordinários apenas por estarmos juntos. Você faz de mim uma pessoa melhor, e por isso sou eternamente grato.",
    closingMessage: "Eu te amo mais do que as palavras podem expressar.",
    finalQuote:
      "Em um mundo cheio de possibilidades, você é minha certeza. Em um universo de estrelas, você é meu sol. Em uma vida de escolhas, você é minha melhor decisão.",
    promises: [
      {
        icon: "💕",
        title: "Amor Incondicional",
        description: "Te amar em todos os momentos, nos bons e nos desafiadores, sempre com paciência e compreensão.",
      },
      {
        icon: "🤝",
        title: "Companheirismo",
        description:
          "Ser seu parceiro em todas as aventuras da vida, apoiando seus sonhos e celebrando suas conquistas.",
      },
      {
        icon: "😊",
        title: "Alegria Diária",
        description: "Fazer você sorrir todos os dias, trazendo leveza e felicidade para nossa vida juntos.",
      },
      {
        icon: "⭐",
        title: "Crescimento Mútuo",
        description: "Crescer ao seu lado, aprendendo e evoluindo juntos como pessoas e como casal.",
      },
      {
        icon: "🏠",
        title: "Lar Acolhedor",
        description: "Construir um lar cheio de amor, onde nos sintamos seguros e felizes para sempre.",
      },
      {
        icon: "🌈",
        title: "Futuro Brilhante",
        description: "Trabalhar todos os dias para construir o futuro dos nossos sonhos, lado a lado.",
      },
    ],
    timeline: [
      {
        title: "Primeiro Encontro",
        subtitle: "Um dia especial",
        description: "O momento em que nossos caminhos se cruzaram e tudo mudou para sempre.",
      },
      {
        title: 'Primeiro "Eu te amo"',
        subtitle: "Um momento mágico",
        description: "Quando finalmente tivemos coragem de expressar o que nossos corações já sabiam.",
      },
      {
        title: "Momentos Especiais",
        subtitle: "Todos os dias",
        description: "Cada risada compartilhada, cada abraço, cada momento simples que se tornou precioso.",
      },
      {
        title: "Nosso Futuro",
        subtitle: "Para sempre",
        description: "Todos os sonhos que ainda vamos realizar juntos, todas as aventuras que nos esperam.",
      },
    ],
  })


  async function checkKey(){
    const urlParams = new URLSearchParams(window.location.search);
    const keyShare = urlParams.get('share');

    if (keyShare) {
        try {

            const response = await fetch(`http://3.129.114.208:3000/s/${keyShare}`,{method:"GET"})

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


  useEffect(() => {
    checkKey()
  }, [])

  // Função para gerar URL de compartilhamento
    const generateShareUrl = async () => {
        const response = await fetch("http://3.129.114.208:3000/share",
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

  const handlePreview = () => {
    setIsEditing(false)
    setPreview(true)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setPreview(false)
  }

  if (showShareModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <ShareModal shareUrl={shareUrl} onClose={() => setShowShareModal(false)} />
      </div>
    )
  }

  if (isEditing) {
    return (
      <EditForm
        formData={formData}
        onFormDataChange={setFormData}
        onPreview={handlePreview}
        onShare={generateShareUrl}
      />
    )
  }

  return (
    <LetterPreview
      formData={formData}
      onEdit={handleEdit}
      onShare={generateShareUrl}
      showEditButtons={isEditing || preview}
    />
  )
}
