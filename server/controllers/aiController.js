export const analyzeReview = async (req, res) => {
    try {
        const { reviewText, rating, hotelName } = req.body

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: `You are an expert fake review detection AI. Analyze the hotel review below and return ONLY a valid JSON object — no markdown, no extra text.

Hotel: "${hotelName}"
Star Rating: ${rating}/5
Review: "${reviewText}"

Return ONLY this JSON:
{
  "overallScore": <0-100>,
  "verdict": "<GENUINE, SUSPICIOUS, or LIKELY FAKE>",
  "specificityScore": <0-100>,
  "sentimentConsistencyScore": <0-100>,
  "languageNaturalnessScore": <0-100>,
  "detailRichnessScore": <0-100>,
  "strongPoints": ["point1", "point2"],
  "weakPoints": ["point1", "point2"],
  "summary": "<2 sentence summary>"
}`
                    }
                ],
                temperature: 0.3,
            })
        })

        const data = await response.json()

        if (!data.choices || !data.choices[0]) {
            return res.json({ success: false, message: "Groq API error: " + JSON.stringify(data) })
        }

        const text = data.choices[0].message.content
        const clean = text.replace(/```json|```/g, "").trim()
        const result = JSON.parse(clean)

        res.json({ success: true, result })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}