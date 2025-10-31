import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { APP_TITLE, COMPANY_INFO, NAVIGATION_ITEMS, SOCIAL_LINKS } from "@/const";
import Logo from "./Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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
      <nav className="container flex justify-center items-center py-4 relative px-4">
        {/* Logo Only - Centered */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition absolute left-4 md:relative md:left-0">
          <Logo className="w-12 h-12 md:w-14 md:h-14" />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex gap-8 items-center">
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="text-foreground font-medium hover:text-primary transition relative flex items-center gap-1"
              >
                {item.label}
                {item.submenu && <ChevronDown size={16} />}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              
              {/* Submenu */}
              {item.submenu && (
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.label}
                      href={subitem.href}
                      className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition first:rounded-t-lg last:rounded-b-lg"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition absolute right-4"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container py-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                  className="w-full text-left px-4 py-2 text-foreground font-medium hover:bg-gray-100 rounded-lg transition flex items-center justify-between"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && openSubmenu === item.label && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium mt-4">
                Admin
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
