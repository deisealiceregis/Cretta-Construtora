import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ImageGalleryProps {
  images: string[];
  title: string;
  projectUrl?: string;
}

export default function ImageGallery({ images, title, projectUrl }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = projectUrl || window.location.href;
  const shareText = `Confira este empreendimento da CRETTA Construtora: ${title}`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "instagram":
        toast.info("Abra o Instagram e compartilhe manualmente");
        setShowShareMenu(false);
        return;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  return (
    <>
      {/* Share Button */}
      <div className="flex justify-end mb-4 relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          <Share2 size={18} />
          Compartilhar
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-3 z-40 min-w-max">
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded transition text-left text-sm"
            >
              <span>💬</span> WhatsApp
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded transition text-left text-sm"
            >
              <span>📘</span> Facebook
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded transition text-left text-sm"
            >
              <span>💼</span> LinkedIn
            </button>
            <button
              onClick={() => handleShare("instagram")}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded transition text-left text-sm"
            >
              <span>📷</span> Instagram
            </button>
            <hr className="my-2" />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded transition text-left text-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copiado!" : "Copiar Link"}
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-32 md:h-40 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`${title} - Imagem ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                Ver em tamanho maior
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          role="dialog"
          tabIndex={0}
          style={{ zIndex: 50 }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          {/* Main Image */}
          <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <img
              src={images[selectedIndex]}
              alt={`${title} - Imagem ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={32} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedIndex + 1} / {images.length}
                </div>

                {/* Share Button in Modal */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  className="absolute top-4 left-4 text-white hover:bg-white/20 p-2 rounded-full transition"
                  aria-label="Compartilhar imagem"
                >
                  <Share2 size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
