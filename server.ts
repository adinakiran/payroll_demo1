import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Body parser with 25MB limit for PDF and image payslips
  app.use(express.json({ limit: '25mb' }));

  const ai = new GoogleGenAI();

  // API Route to parse & analyze uploaded payslip
  app.post('/api/analyze-payslip', async (req, res) => {
    try {
      const { fileData, mimeType, fileName } = req.body;

      if (!fileData || !mimeType) {
        return res.status(400).json({ error: 'Missing fileData or mimeType' });
      }

      const prompt = `You are PayPilot's autonomous forensic payroll auditor.
Analyze this uploaded payslip document (Filename: "${fileName || 'payslip'}").
Carefully read the document image/PDF and extract the REAL values, employer name, employee name, dates, earnings components, and deductions.
Do NOT output sample/placeholder data — extract what is actually written on the document.
If the document is handwritten, blurry, or partially obscured, extract everything legible.

Return a valid JSON object matching this exact schema:
{
  "employer": "Name of Employer / Organization",
  "period": "Month and Year of the payslip, e.g. September 2024",
  "employeeName": "Employee Full Name",
  "empId": "Employee ID / Code",
  "grossPay": 0.0,
  "netPay": 0.0,
  "totalDeductions": 0.0,
  "earnings": [
    { "name": "Basic Salary", "amount": 0.0 }
  ],
  "deductions": [
    { "name": "Provident Fund (EPF)", "amount": 0.0, "flagged": false, "reason": "" }
  ],
  "anomaliesDetected": [
    {
      "title": "Anomaly title or discrepancy description",
      "description": "Specific observation on why this item is notable, unusual, or differs from standard payroll norms",
      "severity": "high",
      "impact": "Monetary or policy impact, e.g. -₹1,500",
      "lawOrPolicy": "Relevant statutory rule or corporate policy clause"
    }
  ],
  "aiSummary": "Clear, professional 2-4 sentence executive summary detailing the exact numbers extracted from this document, total take-home pay, deductions, and potential discrepancies or tax optimization tips."
}
IMPORTANT: Return ONLY the JSON object, without backticks or markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            inlineData: {
              data: fileData,
              mimeType: mimeType,
            },
          },
          prompt,
        ],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      }

      return res.json(parsed);
    } catch (error: any) {
      console.error('Error analyzing payslip with Gemini:', error);
      return res.status(500).json({
        error: error.message || 'Failed to analyze payslip with Gemini API',
      });
    }
  });

  // API Route for interactive chat about the uploaded payslip
  app.post('/api/chat-payslip', async (req, res) => {
    try {
      const { question, payslipData } = req.body;

      const prompt = `You are PayPilot's AI forensic payroll specialist.
A user uploaded their real payslip with these extracted details:
${JSON.stringify(payslipData, null, 2)}

The user asks: "${question}"

Provide a direct, accurate, and helpful response explaining the numbers, tax rules (Income Tax Sec 192 / Sec 115BAC), EPFO rules, or attendance deduction logic based strictly on the uploaded payslip provided. Keep formatting clean with bold figures and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Error in chat-payslip:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate answer' });
    }
  });

  // Serve with Vite in dev, or dist in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
