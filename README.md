# 🧩 Cooplix Number Match Game

A lovable and minimalist number puzzle game where you match tiles that are either the same or add up to 10. Built with a focus on smooth gameplay, soft UI, and an engaging user experience.

🔗 **Play it live:** [www.cooplix.site](https://www.cooplix.site)

---
![Screenshot 2025-06-29 123129](https://github.com/user-attachments/assets/4fac65f0-a722-4012-a535-659608346a47)

## 🎮 Game Concept

- Tap two numbers that are:
  - **Identical** (e.g., 7 + 7), or  
  - **Add up to 10** (e.g., 4 + 6)
- Valid matches must be:
  - **Adjacent** (vertically, horizontally, diagonally), or  
  - At the **ends of the same row**
- After a successful match:
  - The numbers disappear
  - A gray tile with the letter `N` appears in their place (non-interactive visual element)
- If no matches are available, you can **add a new row** to continue playing

---

## ✨ Features

- 💡 **Hint Button**: Tap to highlight the first available valid match
- 🧠 **Brain Training Gameplay**: Perfect for short, casual puzzle sessions
- 💖 **Lovable UI**: Soft pastel colors, emoji tile faces, gentle bounce animations
- 🔁 **Restart Button**: Instantly reset the board
- 📱 **Responsive Design**: Works great on desktop and mobile

---

## 📦 Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **Game Logic**: Custom hook (`useGameLogic`)
- **Animations**: CSS transitions or Framer Motion
- **Deployment**: Hosted at [www.cooplix.site](https://www.cooplix.site)

---

## 🚀 Getting Started

To run the game locally:

```bash
git clone https://github.com/your-username/cooplix-number-match.git
cd cooplix-number-match
npm install
npm run dev
