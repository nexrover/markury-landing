"use client"

import FlashcardDeck from '@/components/tools/FlashcardDeck'

export default function SharedFlashcardDeck({
  cards,
}: {
  cards: Array<{ q: string; a: string }>
}) {
  return <FlashcardDeck cards={cards} />
}
