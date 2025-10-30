import { COMPANY_INFO } from "@/const";

export default function QuemSomos() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Quem Somos</h1>
          <p className="text-lg text-gray-200">Conheça a história e missão da CRETTA Construtora.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-primary">Sobre a CRETTA</h2>
          <p className="text-lg text-gray-700 mb-6">
            {COMPANY_INFO.description}
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Com anos de experiência no mercado, a CRETTA Construtora se destaca pela qualidade, inovação e compromisso com a excelência em todos os seus projetos.
          </p>
          <p className="text-lg text-gray-700">
            Nossa equipe é composta por profissionais altamente qualificados, dedicados a transformar ideias em realidade, sempre respeitando prazos, orçamentos e as mais altas normas de qualidade.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Localização</h2>
          <div className="bg-white rounded-lg shadow-md p-8 border border-border">
            <p className="text-lg text-gray-700 mb-4">
              <strong>{COMPANY_INFO.address}</strong>
            </p>
            <p className="text-gray-700 mb-2">{COMPANY_INFO.neighborhood}</p>
            <p className="text-gray-700 mb-2">{COMPANY_INFO.city}</p>
            <p className="text-gray-700">CEP: {COMPANY_INFO.cep}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
