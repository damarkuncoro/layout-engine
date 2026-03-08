import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NavbarConfig } from '../types';

export function useAIGeneration(updateConfig: (updates: Partial<NavbarConfig>) => void) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are an expert UI/UX designer. Based on this prompt: "${aiPrompt}", 
      generate a JSON configuration for a navbar. 
      The JSON must strictly follow this structure and use these exact keys:
      {
        "style": "minimal" | "glass" | "brutalist" | "modern" | "floating",
        "logoText": "string",
        "logoType": "text",
        "links": [{"id": "string", "label": "string", "href": "#", "dropdown": []}],
        "sticky": boolean,
        "shrinkOnScroll": boolean,
        "fullWidth": boolean,
        "alignment": "left" | "center" | "right" | "between",
        "theme": "light" | "dark",
        "primaryColor": "hex_color",
        "backgroundColor": "hex_color",
        "textColor": "hex_color",
        "showCta": boolean,
        "ctaText": "string",
        "ctaHref": "#",
        "showSearch": boolean,
        "searchPlaceholder": "string",
        "borderRadius": "0.5rem",
        "paddingX": "1.5rem",
        "paddingY": "1rem"
      }
      Return ONLY the JSON object, no markdown, no explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const cleanedJson = text.replace(/```json|```/g, '').trim();
      const newConfig = JSON.parse(cleanedJson);
      
      updateConfig(newConfig);
      setAiPrompt('');
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Maaf, gagal membuat desain dengan AI. Pastikan API Key sudah terpasang.");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    aiPrompt,
    setAiPrompt,
    isGenerating,
    generateWithAI
  };
}
