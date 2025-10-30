import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";
import { APP_TITLE, COMPANY_INFO, NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/const";
import Logo from "./Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-foreground sticky top-0 z-50 shadow-lg border-b-4 border-primary">
      {/* Top Bar with Contact Info */}
      <div className="bg-primary text-white py-2 px-4 text-sm">
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
                className="hover:opacity-80 transition"
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
      <nav className="container flex justify-between items-center py-3">
        {/* Logo - Larger and more prominent */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition flex-shrink-0">
          <Logo className="w-14 h-14 md:w-16 md:h-16" />
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl text-primary hidden sm:block">CRETTA</span>
            <span className="text-xs text-gray-600 hidden md:block">CONSTRUTORA E INCORPORADORA</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground font-medium hover:text-primary transition relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link href="/admin">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium">
              Admin
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container py-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="text-foreground font-medium hover:text-primary transition py-2 px-4 rounded hover:bg-gray-100">
                  {item.label}
                </div>
              </Link>
            ))}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <div className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium">
                Admin
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
