/**
 * Landing Page Example - Menggunakan layout-engine-react
 *
 * Contoh halaman landing page lengkap dengan hero, features, pricing, dan footer
 */

import React from "react"
import {
  LandingLayout,
  Container,
  Flex,
  Box,
  Grid,
  Stack,
  theme,
  NavbarTransparentSolidAutoVW,
  NavbarTransparentSolidAutoWithOutsideClose,
  NavbarTopStickyLightAutoVW,
  NavbarCenteredBrandAutoVW,
  NavbarUnderlineOnlyAutoVW,
  NavbarGlassBlurAutoVW
} from "@damarkuncoro/layout-engine-react"

// ============================================================================
// Components
// ============================================================================

function AppNavbar() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return NavbarTransparentSolidAutoVW({
    contained: true,
    scrolled,
    collapseAt: "md",
    menuOpen: open,
    onMenuToggle: () => setOpen(!open),
    left: Box({
      style: { fontWeight: 700, fontSize: "1.5rem" },
      children: "Brand"
    }),
    center: Flex({
      gap: 4,
      children: [
        Box({ children: "Features" }),
        Box({ children: "Pricing" }),
        Box({ children: "About" }),
        Box({ children: "Contact" })
      ]
    }),
    right: Box({
      style: { 
        backgroundColor: theme.primary, 
        color: theme.primaryFg,
        padding: "8px 16px",
        borderRadius: theme.radiusMd,
        cursor: "pointer"
      },
      children: "Get Started"
    })
  })
}

function Hero() {
  return Container({
    children: Flex({
      direction: "column",
      align: "center",
      gap: 4,
      style: { textAlign: "center", padding: "80px 0" },
      children: [
        // Badge
        Box({
          style: {
            backgroundColor: theme.bgMuted,
            color: theme.fgMuted,
            padding: "4px 12px",
            borderRadius: theme.radiusFull,
            fontSize: theme.textSm,
            marginBottom: "16px"
          },
          children: "🚀 New features available"
        }),
        
        // Headline
        Box({
          style: { 
            fontSize: theme.text4xl, 
            fontWeight: theme.fontBold,
            maxWidth: "800px",
            lineHeight: theme.leadingTight
          },
          children: "Build beautiful layouts with ease"
        }),
        
        // Subheadline
        Box({
          style: { 
            fontSize: theme.textLg, 
            color: theme.fgMuted,
            maxWidth: "600px",
            marginTop: "16px"
          },
          children: "A powerful layout engine that gives you the building blocks you need to create stunning web applications."
        }),
        
        // CTA Buttons
        Flex({
          gap: 3,
          marginTop: "32px",
          children: [
            Box({
              style: {
                backgroundColor: theme.primary,
                color: theme.primaryFg,
                padding: "12px 24px",
                borderRadius: theme.radiusMd,
                fontWeight: theme.fontMedium,
                cursor: "pointer"
              },
              children: "Get Started Free"
            }),
            Box({
              style: {
                backgroundColor: "transparent",
                border: `1px solid ${theme.border}`,
                color: theme.fg,
                padding: "12px 24px",
                borderRadius: theme.radiusMd,
                fontWeight: theme.fontMedium,
                cursor: "pointer"
              },
              children: "View Demo"
            })
          ]
        })
      ]
    })
  })
}

function FeatureCard({ title, description, icon }) {
  return Box({
    style: {
      padding: "24px",
      backgroundColor: theme.bg,
      border: `1px solid ${theme.border}`,
      borderRadius: theme.radiusLg
    },
    children: Flex({
      direction: "column",
      gap: 3,
      children: [
        Box({
          style: { fontSize: "2rem" },
          children: icon
        }),
        Box({
          style: { fontWeight: theme.fontSemibold, fontSize: theme.textLg },
          children: title
        }),
        Box({
          style: { color: theme.fgMuted },
          children: description
        })
      ]
    })
  })
}

function Features() {
  return Container({
    children: Flex({
      direction: "column",
      gap: 6,
      style: { padding: "80px 0" },
      children: [
        // Section Header
        Flex({
          direction: "column",
          align: "center",
          gap: 2,
          children: [
            Box({
              style: { 
                fontSize: theme.textSm, 
                color: theme.primary,
                fontWeight: theme.fontMedium 
              },
              children: "FEATURES"
            }),
            Box({
              style: { 
                fontSize: theme.text3xl, 
                fontWeight: theme.fontBold 
              },
              children: "Everything you need"
            }),
            Box({
              style: { 
                color: theme.fgMuted, 
                maxWidth: "500px",
                marginTop: "8px"
              },
              children: "Our layout engine provides all the primitives and patterns you need to build modern web applications."
            })
          ]
        }),
        
        // Feature Grid
        Grid({
          columns: 3,
          gap: 4,
          children: [
            FeatureCard({ 
              icon: "⚡", 
              title: "Lightning Fast", 
              description: "Optimized for performance with minimal bundle size and zero runtime overhead." 
            }),
            FeatureCard({ 
              icon: "🎨", 
              title: "Fully Customizable", 
              description: "Every component is customizable with props and supports responsive values." 
            }),
            FeatureCard({ 
              icon: "📱", 
              title: "Responsive", 
              description: "Built-in responsive system that adapts to any screen size automatically." 
            }),
            FeatureCard({ 
              icon: "🔧", 
              title: "TypeScript", 
              description: "Full TypeScript support with comprehensive type definitions." 
            }),
            FeatureCard({ 
              icon: "♿", 
              title: "Accessible", 
              description: "Components are built with accessibility best practices in mind." 
            }),
            FeatureCard({ 
              icon: "🌙", 
              title: "Dark Mode", 
              description: "First-class support for dark mode with system preference detection." 
            })
          ]
        })
      ]
    })
  })
}

function PricingCard({ title, price, features, highlighted = false }) {
  return Box({
    style: {
      padding: "32px",
      backgroundColor: highlighted ? theme.bgSubtle : theme.bg,
      border: highlighted ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
      borderRadius: theme.radiusLg
    },
    children: Flex({
      direction: "column",
      gap: 4,
      children: [
        Box({
          style: { fontWeight: theme.fontSemibold, fontSize: theme.textLg },
          children: title
        }),
        Flex({
          align: "baseline",
          gap: 1,
          children: [
            Box({
              style: { fontSize: theme.text4xl, fontWeight: theme.fontBold },
              children: price
            }),
            Box({
              style: { color: theme.fgMuted },
              children: "/month"
            })
          ]
        }),
        Stack({
          gap: 2,
          children: features.map((feature, i) => 
            Flex({
              gap: 2,
              key: i,
              children: [
                Box({ 
                  style: { color: theme.success },
                  children: "✓"
                }),
                Box({ children: feature })
              ]
            })
          )
        }),
        Box({
          style: {
            backgroundColor: highlighted ? theme.primary : "transparent",
            color: highlighted ? theme.primaryFg : theme.primary,
            border: highlighted ? "none" : `1px solid ${theme.primary}`,
            padding: "12px",
            borderRadius: theme.radiusMd,
            textAlign: "center",
            marginTop: "16px",
            cursor: "pointer",
            fontWeight: theme.fontMedium
          },
          children: highlighted ? "Get Started" : "Start Free Trial"
        })
      ]
    })
  })
}

function Pricing() {
  return Container({
    style: { backgroundColor: theme.bgSubtle },
    children: Flex({
      direction: "column",
      gap: 6,
      style: { padding: "80px 0" },
      children: [
        // Section Header
        Flex({
          direction: "column",
          align: "center",
          gap: 2,
          children: [
            Box({
              style: { 
                fontSize: theme.textSm, 
                color: theme.primary,
                fontWeight: theme.fontMedium 
              },
              children: "PRICING"
            }),
            Box({
              style: { 
                fontSize: theme.text3xl, 
                fontWeight: theme.fontBold 
              },
              children: "Simple, transparent pricing"
            }),
            Box({
              style: { 
                color: theme.fgMuted, 
                maxWidth: "500px",
                marginTop: "8px"
              },
              children: "Choose the plan that's right for you. No hidden fees."
            })
          ]
        }),
        
        // Pricing Cards
        Grid({
          columns: 3,
          gap: 4,
          children: [
            PricingCard({
              title: "Starter",
              price: "$0",
              features: [
                "5 projects",
                "Basic layouts",
                "Community support"
              ]
            }),
            PricingCard({
              title: "Pro",
              price: "$29",
              highlighted: true,
              features: [
                "Unlimited projects",
                "Advanced layouts",
                "Priority support",
                "Custom themes"
              ]
            }),
            PricingCard({
              title: "Enterprise",
              price: "$99",
              features: [
                "Everything in Pro",
                "SLA guarantee",
                "24/7 support",
                "Custom integrations"
              ]
            })
          ]
        })
      ]
    })
  })
}

function Footer() {
  return Container({
    children: Flex({
      direction: "column",
      gap: 4,
      style: { padding: "48px 0", borderTop: `1px solid ${theme.border}` },
      children: [
        // Footer Top
        Grid({
          columns: 4,
          gap: 6,
          children: [
            // Brand
            Flex({
              direction: "column",
              gap: 2,
              children: [
                Box({
                  style: { fontWeight: theme.fontBold, fontSize: theme.textXl },
                  children: "Brand"
                }),
                Box({
                  style: { color: theme.fgMuted, fontSize: theme.textSm },
                  children: "Build beautiful layouts with ease."
                })
              ]
            }),
            
            // Product
            Flex({
              direction: "column",
              gap: 2,
              children: [
                Box({ style: { fontWeight: theme.fontSemibold }, children: "Product" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Features" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Pricing" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Changelog" })
              ]
            }),
            
            // Company
            Flex({
              direction: "column",
              gap: 2,
              children: [
                Box({ style: { fontWeight: theme.fontSemibold }, children: "Company" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "About" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Blog" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Careers" })
              ]
            }),
            
            // Legal
            Flex({
              direction: "column",
              gap: 2,
              children: [
                Box({ style: { fontWeight: theme.fontSemibold }, children: "Legal" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Privacy" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Terms" }),
                Box({ style: { color: theme.fgMuted, fontSize: theme.textSm }, children: "Cookies" })
              ]
            })
          ]
        }),
        
        // Footer Bottom
        Box({
          style: { 
            color: theme.fgSubtle, 
            fontSize: theme.textSm,
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: `1px solid ${theme.border}`
          },
          children: "© 2024 Brand. All rights reserved."
        })
      ]
    })
  })
}

// ============================================================================
// Main Page
// ============================================================================

export default function LandingPage() {
  const [view, setView] = React.useState(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search)
      return p.get("view") || "home"
    }
    return "home"
  })
  React.useEffect(() => {
    const onPop = () => {
      const p = new URLSearchParams(window.location.search)
      setView(p.get("view") || "home")
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])
  const goto = (v) => {
    const url = new URL(window.location.href)
    if (v === "home") url.searchParams.delete("view")
    else url.searchParams.set("view", v)
    window.history.pushState({}, "", url.toString())
    const p = new URLSearchParams(window.location.search)
    setView(p.get("view") || "home")
  }
  if (view === "navbars") {
    return (
      <Container>
        {NavbarTopStickyLightAutoVW({
          contained: true,
          position: "static",
          contentPadding: 12,
          barPadding: 8,
          left: Box({ children: "Top Sticky Light" }),
          center: Flex({ gap: 3, children: [Box({ children: "Docs" }), Box({ children: "API" }), Box({ children: "GitHub" })] }),
          right: Box({ children: "Sign In", style: { cursor: "pointer" } })
        })}
        {Box({ style: { height: "16px" } })}
        {NavbarGlassBlurAutoVW({
          contained: true,
          position: "static",
           contentPadding: 16,
           barPadding: 10,
          left: Box({ children: "Glass/Blur" }),
          center: Flex({ gap: 3, children: [Box({ children: "Overview" }), Box({ children: "Tokens" }), Box({ children: "Themes" })] }),
          right: Box({ children: "Try", style: { backgroundColor: theme.primary, color: theme.primaryFg, padding: "8px 12px", borderRadius: theme.radiusMd, cursor: "pointer" } })
        })}
        {Box({ style: { height: "16px" } })}
        {NavbarTransparentSolidAutoVW({
          contained: true,
          position: "static",
          contentPadding: 12,
          barPadding: 8,
          left: Box({ children: "Transparent → Solid" }),
          center: Flex({ gap: 3, children: [Box({ children: "Features" }), Box({ children: "Pricing" }), Box({ children: "About" })] }),
          right: Box({ children: "Get Started", style: { backgroundColor: theme.primary, color: theme.primaryFg, padding: "8px 12px", borderRadius: theme.radiusMd, cursor: "pointer" } })
        })}
        {Box({ style: { height: "16px" } })}
        {(() => {
          const [open, setOpen] = React.useState(false)
          const [scrolled, setScrolled] = React.useState(false)
          React.useEffect(() => {
            const onScroll = () => setScrolled(window.scrollY > 16)
            onScroll()
            window.addEventListener("scroll", onScroll)
            return () => window.removeEventListener("scroll", onScroll)
          }, [])
          return NavbarTransparentSolidAutoWithOutsideClose({
            contained: true,
            scrolled,
            left: Box({ children: "Transparent → Solid (Outside Close)" }),
            center: Flex({ gap: 3, children: [Box({ children: "A" }), Box({ children: "B" }), Box({ children: "C" })] }),
            right: Box({ children: "Action" }),
            collapseAt: "md",
            menuOpen: open,
            onMenuToggle: () => setOpen(!open)
          })
        })()}
        {NavbarCenteredBrandAutoVW({
          contained: true,
          position: "static",
          center: Box({ children: "Brand" }),
          left: Flex({ gap: 2, children: [Box({ children: "Home" }), Box({ children: "Docs" })] }),
          right: Flex({ gap: 2, children: [Box({ children: "Login" }), Box({ children: "Signup" })] })
        })}
        {Box({ style: { height: "16px" } })}
        {NavbarUnderlineOnlyAutoVW({
          contained: true,
          position: "static",
          left: Box({ children: "Underline Only" }),
          center: Flex({ gap: 3, children: [Box({ children: "Blog" }), Box({ children: "Changelog" }), Box({ children: "Support" })] }),
          right: Box({ children: "Contact" })
        })}
        {Box({
          style: { marginTop: "24px", color: theme.fgMuted, fontSize: theme.textSm },
          children: Flex({
            gap: 2,
            children: [
              Box({ style: { cursor: "pointer", textDecoration: "underline" }, onClick: () => goto("home"), children: "Kembali ke Home" })
            ]
          })
        })}
      </Container>
    )
  }
  return (
    <LandingLayout
      header={
        <Container>
          <AppNavbar />
        </Container>
      }
      hero={<Hero />}
      features={<Features />}
      pricing={<Pricing />}
      footer={
        <Box>
          <Container>
            {Box({
              style: { marginTop: "8px", marginBottom: "8px" },
              children: Box({
                style: { cursor: "pointer", textDecoration: "underline", color: theme.primary },
                onClick: () => goto("navbars"),
                children: "Lihat Halaman Varian Navbar"
              })
            })}
          </Container>
          <Footer />
        </Box>
      }
    />
  )
}
