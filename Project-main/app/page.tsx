"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calculator, Phone, Mail, MapPin, User, Eye, CheckCircle, ArrowRight, Copy, Menu, X } from "lucide-react"

// Custom social icons as SVG components with outline style
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2L3 8.5l5.5 2L12 21l1.5-8.5L21 2z" />
    <path d="M8.5 10.5L12 12.5" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export default function HomePage() {
  const [hectares, setHectares] = useState("")
  const [sotki, setSotki] = useState("")
  const [activeVideo, setActiveVideo] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copyMessage, setCopyMessage] = useState("")

  useEffect(() => {
    if (hoveredStep === null) {
      const interval = setInterval(() => {
        setActiveVideo((prev) => (prev + 1) % 4)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [hoveredStep])

  const handleHectaresChange = (value: string) => {
    setHectares(value)
    if (value && !isNaN(Number(value))) {
      setSotki((Number(value) * 100).toString())
    } else {
      setSotki("")
    }
  }

  const handleSotkiChange = (value: string) => {
    setSotki(value)
    if (value && !isNaN(Number(value))) {
      setHectares((Number(value) / 100).toString())
    } else {
      setHectares("")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopyMessage("Скопировано!")
    setTimeout(() => setCopyMessage(""), 2000)
  }

  const openEmail = () => {
    window.location.href = "mailto:info@aktagroup.ru"
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Copy notification */}
      {copyMessage && (
        <div className="hidden sm:block fixed top-20 right-4 bg-stone-700 text-white px-3 py-1 rounded text-sm z-50">
          {copyMessage}
        </div>
      )}

      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="https://aktagroup.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img src="/images/akta-logo-final.webp" alt="Akta Group" className="h-12 sm:h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("calculator")}
                className="text-stone-600 hover:text-stone-800 transition-colors text-base cursor-pointer"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-stone-600 hover:text-stone-800 transition-colors text-base cursor-pointer"
              >
                Проектирование
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-stone-600 hover:text-stone-800 transition-colors text-base cursor-pointer"
              >
                Контакты
              </button>

              <div className="flex items-center space-x-4 pl-4 border-l border-stone-200">
                <Link
                  href="https://wa.me/78129782020"
                  className="text-stone-600 hover:text-stone-800 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </Link>
                <Link href="https://t.me/aktagroup" className="text-stone-600 hover:text-stone-800 transition-colors">
                  <TelegramIcon className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => copyToClipboard("+78129782020")}
                  className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors text-base"
                >
                  <Phone className="w-4 h-4" />
                  +7 (812) 978-20-20
                </button>
                <button onClick={openEmail} className="text-stone-600 hover:text-stone-800 transition-colors text-base">
                  info@aktagroup.ru
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-stone-600 hover:text-stone-800 transition-colors p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-stone-200">
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection("calculator")}
                  className="text-stone-600 hover:text-stone-800 transition-colors text-left py-2"
                >
                  Калькулятор
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-stone-600 hover:text-stone-800 transition-colors text-left py-2"
                >
                  Проектирование
                </button>
                <button
                  onClick={() => scrollToSection("contacts")}
                  className="text-stone-600 hover:text-stone-800 transition-colors text-left py-2"
                >
                  Контакты
                </button>

                <div className="flex items-center space-x-4 pt-4 border-t border-stone-200">
                  <Link
                    href="https://wa.me/78129782020"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </Link>
                  <Link href="https://t.me/aktagroup" className="text-stone-600 hover:text-stone-800 transition-colors">
                    <TelegramIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => copyToClipboard("+78129782020")}
                    className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    +7 (812) 978-20-20
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Fixed Hero Section with Forest Background */}
      <section
        className="min-h-screen flex items-start justify-center relative bg-cover bg-center bg-no-repeat pt-16 sm:pt-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0.8) 100%), url('/images/forest-field.webp')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-4 sm:mb-6 leading-tight">
            Проверь размер участка за 5 секунд
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Простой онлайн-калькулятор для точного перевода гектаров в сотки и наоборот— бесплатно и без регистрации.
          </p>

          {/* Compact Calculator */}
          <div
            id="calculator"
            className="bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg max-w-2xl mx-auto"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-stone-800 mb-2">Калькулятор метров и соток</h2>
              <p className="text-stone-600 text-sm mb-1">1 сотка = 100 м²</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="squareMeters" className="block text-sm font-medium text-stone-700 mb-2">
                  Квадратные метры (м²)
                </label>
                <input
                  id="squareMeters"
                  type="number"
                  value={squareMeters}
                  onChange={(e) => handleSquareMetersChange(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all text-center text-lg"
                />
              </div>
              <div>
                <label htmlFor="sotki" className="block text-sm font-medium text-stone-700 mb-2">
                  Сотки
                </label>
                <input
                  id="sotki"
                  type="number"
                  value={sotki}
                  onChange={(e) => handleSotkiChange(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all text-center text-lg"
                />
              </div>
            </div>

            {(squareMeters || sotki) && (
              <div className="mt-4 p-4 bg-stone-50/80 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-sm text-stone-700">
                  <Calculator className="w-4 h-4" />
                  {squareMeters && (
                    <span>
                      {squareMeters} м² = {Number(squareMeters) / 100} соток
                    </span>
                  )}
                  {sotki && squareMeters !== (Number(sotki) * 100).toString() && (
                    <span>
                      {sotki} соток = {Number(sotki) * 100} м²
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Steps */}
      <section id="services" className="py-16 sm:py-24 backdrop-blur-sm relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-stone-800 mb-4">
              Мы строим ваш дом — от идеи до фундамента
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              От первой встречи до завершения строительства — полный цикл создания вашего дома
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Display - Modern Minimalist */}
            <div className="order-1">
              <div className="relative aspect-video bg-stone-100 overflow-hidden border border-stone-200">
                {[
                  "/videos/contract-signing-new.mp4", // Swapped: was handshake
                  "/videos/handshake-new.mp4", // Swapped: was contract-signing
                  "/videos/project-design-new.mp4",
                  "/videos/construction-new.mp4",
                ].map((video, index) => (
                  <video
                    key={index}
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      activeVideo === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Video overlay with step indicator */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-stone-800">
                  {["ЗНАКОМСТВО", "РАЗРАБОТКА КОНЦЕПЦИИ", "ПРОЕКТИРОВАНИЕ", "РЕАЛИЗАЦИЯ"][activeVideo]}
                </div>
              </div>
            </div>

            {/* Interactive Steps - Clean Minimalist Design */}
            <div className="order-2 space-y-0">
              {[
                {
                  title: "ЗНАКОМСТВО",
                  description:
                    "Мы слушаем. Ваша история, ваши идеи и желания становятся отправной точкой для создания концепции.",
                  number: "01",
                },
                {
                  title: "РАЗРАБОТКА КОНЦЕПЦИИ",
                  description:
                    "Формируем обоснованную идею проекта с учётом особенностей участка, ваших пожеланий и технических требований.",
                  number: "02",
                },
                {
                  title: "ПРОЕКТИРОВАНИЕ",
                  description:
                    "Разрабатываем архитектурную документацию, схемы и визуализации для точной и качественной реализации проекта.",
                  number: "03",
                },
                {
                  title: "РЕАЛИЗАЦИЯ",
                  description:
                    "Каждый этап строительства контролируется, чтобы результат соответствовал высоким стандартам качества.",
                  number: "04",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-300 border-b border-stone-200 last:border-b-0 ${
                    hoveredStep === index ? "bg-stone-50" : "hover:bg-stone-25"
                  }`}
                  onMouseEnter={() => {
                    setHoveredStep(index)
                    setActiveVideo(index)
                  }}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    setHoveredStep(hoveredStep === index ? null : index)
                    setActiveVideo(index)
                  }}
                >
                  <div className="py-6 px-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`text-2xl font-light transition-colors duration-300 ${
                          hoveredStep === index ? "text-stone-800" : "text-stone-400"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                            hoveredStep === index ? "text-stone-800" : "text-stone-700"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            hoveredStep === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-stone-600 text-sm leading-relaxed pr-4">{step.description}</p>
                        </div>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          hoveredStep === index ? "bg-stone-800 scale-150" : "bg-stone-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-stone-600" />
                  <span className="text-stone-700 font-medium">Свяжитесь с нами для бесплатной консультации</span>
                </div>
                <button
                  onClick={() => scrollToSection("contacts")}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-stone-700 text-stone-700 hover:border-stone-800 hover:text-stone-800 transition-colors font-medium"
                >
                  Подробнее
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Advantages Section */}
      <section className="py-12 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-stone-600" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Индивидуальный подход</h3>
              <p className="text-sm text-stone-600">
                Слушаем и учитываем вашу историю, идеи и потребности с первого дня.
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-stone-600" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Прозрачность и визуализация</h3>
              <p className="text-sm text-stone-600">
                Вы заранее видите результат — благодаря понятной документации и реалистичным визуализациям.
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-stone-600" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Контроль качества</h3>
              <p className="text-sm text-stone-600">
                Следим за каждым этапом реализации, чтобы всё соответствовало высоким стандартам.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Contacts Section */}
      <section id="contacts" className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-light text-stone-800 mb-4">Контакты</h2>
          </div>

          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-stone-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-stone-700" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-stone-800">Телефон</p>
                  <button
                    onClick={() => copyToClipboard("+78129782020")}
                    className="text-stone-600 hover:text-stone-500 transition-colors flex items-center gap-1 text-sm sm:text-base"
                  >
                    +7 (812) 978‑20‑20
                    <Copy className="w-3 h-3 flex-shrink-0" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-stone-700" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-stone-800">Email</p>
                  <button
                    onClick={openEmail}
                    className="text-stone-600 hover:text-stone-500 transition-colors flex items-center gap-1 text-sm sm:text-base break-all"
                  >
                    info@aktagroup.ru
                    <Copy className="w-3 h-3 flex-shrink-0" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-stone-700" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-stone-800">Адрес</p>
                  <Link
                    href="https://yandex.ru/maps/?text=Петровская коса, 6к1, Санкт-Петербург"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-500 transition-colors text-sm"
                  >
                    Петровская коса, 6к1, оф. 42Н
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-stone-300">
              <Link
                href="https://t.me/aktagroup"
                className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center hover:bg-stone-300 transition-colors"
              >
                <TelegramIcon className="w-5 h-5 text-stone-700" />
              </Link>
              <Link
                href="https://wa.me/78129782020"
                className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center hover:bg-stone-300 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-stone-700" />
              </Link>
              <Link
                href="https://instagram.com/aktagroup"
                className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center hover:bg-stone-300 transition-colors"
              >
                <InstagramIcon className="w-5 h-5 text-stone-700" />
              </Link>
              <Link
                href="https://aktagroup.ru"
                className="text-stone-600 hover:text-stone-500 transition-colors text-sm ml-4"
              >
                aktagroup.ru
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
