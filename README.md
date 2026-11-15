# Chethan S. — Developer & Data Visualization Portfolio

A modern, futuristic, dark-themed personal portfolio website built for **Chethan S.**, a student at **MVJ College of Engineering, Bengaluru**.

Designed with a visual identity that combines a futuristic developer workspace, an interactive digital laboratory, and a personal portfolio.

---

## 🚀 Live Demo & Local Setup

This portfolio is built using **HTML5, CSS3, and Vanilla JavaScript** with **zero external build tools or framework dependencies**.

### Quick Run Options

#### Option 1: Direct Browser Access
Simply double-click `index.html` or open it with your browser of choice (Chrome, Safari, Firefox, Edge).

#### Option 2: Python Local Server (Recommended for Canvas & Module Testing)
Open a terminal in this project folder and run:

```bash
# Python 3
python3 -m http.server 3000
```
Then visit: `http://localhost:3000`

#### Option 3: Node / NPX Serve
```bash
npx -y serve .
```

---

## 🎨 Visual Identity & Key Highlights

- **Aesthetic**: Deep space black (`#05070c`), charcoal surface cards, and dark navy undertones with electric violet (`#8b5cf6`) and cyan blue (`#06b6d4`) accents.
- **Typography**: Google Fonts `Space Grotesk` (futuristic tech headings), `Inter` (crisp readable body text), and `JetBrains Mono` (code & telemetry).
- **Interactive Background**: Ambient canvas constellation grid with subtle particle physics, mouse repulsion/attraction, and automatic CPU throttling.
- **Hero Code Terminal**: Interactive multi-tab developer terminal with syntax highlighting (`appointment.py`, `visualizer.js`, `metrics.json`) and executable console simulation.
- **Data Visualization Showcase ("Turning Data Into Insight")**: Fully custom interactive HTML5 canvas line and bar chart engines with smooth bezier curves, dynamic hover tooltips, and real-time dataset toggling.
- **Project Bento Grid**: Asymmetrical cards with custom UI mockups:
  1. *HireNova* (Full-Stack Online Job Portal with Flask, SQLite, and Recruiter Dashboard)
  2. *Hospital Appointment System* (Python Medical Dashboard Mockup with Conflict Prevention engine)
  3. *Project Pilot* (Student Discovery Platform Mockup with Search Filtering)
  4. *Responsive Web Design* (Multi-device Desktop/Tablet/Mobile viewports)
  5. *Hyper Monsoon Onset* (Atmospheric Weather Radar Visualizer)
  6. *ZEWA: Zero Waste* (Sustainability Food Discovery Surplus Cards)
- **Interactive Project Modal**: Deep-dive popup for each project detailing problem space, core features, and tech stacks.
- **Development Journey**: 3-pillar horizontal timeline on desktop, converting cleanly into a vertical timeline on mobile.
- **Accessible & Responsive**: Keyboard navigable, visible focus states, ARIA labels, responsive navigation with hamburger drawer, and `prefers-reduced-motion` compliance.

---

## 📞 Verified Contact Information

- **Name**: Chethan S.
- **Institution**: MVJ College of Engineering, Bengaluru
- **Email**: [chethan.sv2006@gmail.com](mailto:chethan.sv2006@gmail.com)
- **Phone**: [+91 9686812766](tel:+919686812766)
- **LinkedIn**: [linkedin.com/in/chethans27](https://www.linkedin.com/in/chethans27/)
- **GitHub**: [github.com/chethan-0427](https://github.com/chethan-0427)

---

## 🛠️ Backend Integration & Customization Guide

### 3. Contact Form Backend Integration
The contact form currently validates all inputs on the client side and provides an honest status message:
```html
<!-- To receive actual emails via Formspree, update the <form> tag in index.html: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Or hook it up to **EmailJS** / custom backend endpoint.

### 4. Hyper Monsoon Onset Project Details
In `index.html` (Projects section) and `script.js` (Project modal data):
- The description and technology tags are marked as configurable and can be updated when Chethan confirms specific datasets or APIs used.

---

## 📂 File Structure

```
chethan_portfolio/
├── index.html        # Semantic HTML5 document structure & accessibility landmarks
├── style.css         # Complete design system, glassmorphism, responsive grid, & animations
├── script.js         # Canvas background, typewriter, terminal, data charts, modals, & validation
└── README.md         # Documentation, run guide, & customization reference
```

---

## ⚖️ Integrity & Authenticity Notice

In accordance with strict portfolio ethics:
- No fake certifications, fabricated work experience, or unverified degrees are included.
- No artificial proficiency percentages or years of experience are listed.
- The contact form clearly informs visitors that client-side validation is active and describes backend requirements.
