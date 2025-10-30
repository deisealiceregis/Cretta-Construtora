import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";
import { APP_TITLE, COMPANY_INFO, NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/const";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      {/* Top Bar with Contact Info */}
      <div className="bg-black text-white py-2 px-4 text-sm">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <a
              href={`tel:${COMPANY_INFO.phone1}`}
              className="flex items-center gap-2 hover:text-accent transition"
            >
              <Phone size={16} />
              <span>{COMPANY_INFO.phone1}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2 hover:text-accent transition"
            >
              <Mail size={16} />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
                title={link.name}
              >
                {link.name === "Facebook" && <span>f</span>}
                {link.name === "Instagram" && <span>📷</span>}
                {link.name === "WhatsApp" && <span>💬</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="container flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-bold text-primary">
            C
          </div>
          <span className="font-bold text-lg hidden sm:inline">{APP_TITLE}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-accent transition font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20">
          <div className="container py-4 flex flex-col gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
