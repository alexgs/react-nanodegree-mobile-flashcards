export const ACTIONS = {
    CARDS: {
        SAVE_NEW: { COMPLETE: 'actions.save-new-card.complete' }
    },
    DECKS: {
        DELETE_DECK: { COMPLETE: 'actions.delete-deck.complete' },
        LOAD_CARDS: { COMPLETE: 'actions.load-deck-cards.complete' },
        LOAD_METADATA: { COMPLETE: 'actions.load-deck-metadata.complete' },
        SAVE_NEW: { COMPLETE: 'actions.save-new-deck.complete' }
    }
};

export const ASYNC_TYPES = {
    CARD: 'async-type.card',
    DECK_METADATA: 'async-type.deck-metadata'
};

export const ERROR_SOURCES = {
    API: 'error-sources.api'
};

export const SCREENS = {
    HOME: 'screens.home',
    DECK_LIST: 'screens.deck-list',
    NEW_DECK: 'screens.new-deck',
    SINGLE_DECK: 'screens.single-deck',
    NEW_CARD: 'screens.new-card',
    QUIZ: 'screens.quiz'
};

export const STORE = {
    DECKS: 'decks',
    DECK_METADATA: 'deck-metadata'
};
