/**
 * Calculate similarity between two text documents
 * This is a simple implementation using Jaccard similarity
 * In a real application, you might want to use more sophisticated algorithms
 * or integrate with AI services like OpenAI for better results
 */
export function calculateSimilarity(text1: string, text2: string): number {
  // Convert to lowercase and remove punctuation
  const cleanText1 = text1.toLowerCase().replace(/[^\w\s]/g, "")
  const cleanText2 = text2.toLowerCase().replace(/[^\w\s]/g, "")

  // Split into words
  const words1 = new Set(cleanText1.split(/\s+/).filter((word) => word.length > 0))
  const words2 = new Set(cleanText2.split(/\s+/).filter((word) => word.length > 0))

  // Calculate Jaccard similarity
  const intersection = new Set([...words1].filter((word) => words2.has(word)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}

/**
 * Enhanced document matching with AI (OpenAI integration)
 * This is a placeholder for the bonus feature
 * In a real application, you would integrate with OpenAI API
 */
export async function aiEnhancedMatching(text: string, documents: any[]): Promise<any[]> {
  // This would be implemented with OpenAI API in a real application
  // For now, we'll use the basic similarity function

  return documents
    .map((doc) => ({
      ...doc,
      similarity: calculateSimilarity(text, doc.content),
    }))
    .filter((doc) => doc.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity)
}

