export const ACTIONS = {
    DECKS: {
        LOAD_METADATA: { COMPLETE: 'actions.load-deck-metadata.complete' },
        SAVE_NEW: { COMPLETE: 'actions.save-new-deck.complete' }
    }
};

export const ASYNC_TYPES = {
    CARD: 'async-type.card',
    DECK_METADATA: 'async-type.deck-metadata'
};

export const ERROR_SOURCES = {
    API: 'error-source-api'
};

export const STORE = {
    DECKS: 'decks',
    DECK_METADATA: 'deck-metadata'
};
