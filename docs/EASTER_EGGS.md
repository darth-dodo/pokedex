# Easter Eggs Guide

This document contains spoilers for all hidden easter eggs in the Pokedex application. These features are designed to reward curious users and demonstrate interactive programming concepts.

## Easter Egg #1: Pikachu Special Alert

**Location**: Pokemon List (HomePage)
**Trigger**: Select Pikachu as a favorite
**Implementation**: `PokemonList.vue` - `checkEasterEgg()` method

```javascript
checkEasterEgg(pokemonName) {
    if (pokemonName === 'pikachu') {
        setTimeout(() => {
            alert('⚡ Pika Pika! You found the electric mouse! ⚡')
        }, 500)
    }
}
```

**Educational Purpose**: Demonstrates conditional logic and delayed execution

## Easter Egg #2: Logo Click Counter

**Location**: Home Page Logo
**Trigger**: Click the Pokemon logo 10 times
**Implementation**: `homePage.vue` - `secretCode()` method

```javascript
secretCode() {
    if (this.logoClickCount >= 10) {
        alert('🎉 Logo Master! You clicked the logo 10 times! Try the Konami Code now! 🎉')
        this.logoClickCount = 0
    }
}
```

**Educational Purpose**: Shows event handling and state tracking

## Easter Egg #3: Konami Code

**Location**: Any page (global keyboard listener)
**Trigger**: Input sequence: ↑↑↓↓←→←→BA (classic Konami code)
**Implementation**: `homePage.vue` - `handleKeydown()` and `activateKonamiCode()` methods

```javascript
handleKeydown(event) {
    this.secretSequence.push(event.code)
    if (this.secretSequence.length > this.konamiCode.length) {
        this.secretSequence.shift()
    }
    if (this.secretSequence.length === this.konamiCode.length && 
        this.secretSequence.every((key, index) => key === this.konamiCode[index])) {
        this.activateKonamiCode()
        this.secretSequence = []
    }
}

activateKonamiCode() {
    alert('🎮 KONAMI CODE ACTIVATED! 🎮\n30 Extra Lives Granted!\n(Just kidding, but you found the secret!)')
    document.body.style.transform = 'rotate(360deg)'
    document.body.style.transition = 'transform 2s ease'
    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)'
    }, 2000)
}
```

**Educational Purpose**: Complex event handling, array manipulation, and DOM animation

## Easter Egg #4: Delete List Counter

**Location**: Favorites Summary (HomePage sidebar)
**Trigger**: Delete the favorites list 5 times
**Implementation**: `SummaryFavorites.vue` - `emptyFavoritePokemonList()` method

```javascript
emptyFavoritePokemonList() {
    this.eraseFavoritePokemonList()
    this.clickCount++
    if (this.clickCount === 5) {
        alert('🗑️ You really like clearing lists! Here\'s a secret: Try clicking the logo 10 times! 🗑️')
        this.clickCount = 0
    }
}
```

**Educational Purpose**: State persistence across multiple actions and cross-referencing easter eggs

## Easter Egg #5: Double-Click Pick Button

**Location**: Favorites Summary (HomePage sidebar)
**Trigger**: Double-click the "Pick Pokémon" button
**Implementation**: `SummaryFavorites.vue` - `konamiEasterEgg()` method

```javascript
konamiEasterEgg() {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav')
    audio.play().catch(() => {})
    alert('🎮 Konami Code Master! You found the secret double-click! 🎮')
}
```

**Educational Purpose**: Audio integration and error handling

## Easter Egg #6: Favorites Title Click

**Location**: Favorites Page title
**Trigger**: Click the "Your favorite Pokémon" title 7 times
**Implementation**: `favortiesPage.vue` - watcher on `titleClickCount`

```javascript
watch: {
    titleClickCount(newVal) {
        if (newVal === 7) {
            alert('🏆 Congratulations! You found the final easter egg! You clicked the title 7 times! 🏆')
            this.titleClickCount = 0
        }
    }
}
```

**Educational Purpose**: Vue watchers and reactive data

## Design Patterns Used

### 1. Counter Pattern
Multiple easter eggs use simple counters to track user interactions:
- Logo clicks (10 times)
- Delete actions (5 times)
- Title clicks (7 times)

### 2. Sequence Detection
The Konami code demonstrates sequence pattern matching:
- Maintains a sliding window of recent key presses
- Compares against target sequence
- Triggers when match is found

### 3. Delayed Execution
Several easter eggs use setTimeout for better UX:
- Pikachu alert (500ms delay)
- Animation cleanup (2000ms delay)

### 4. Cross-Reference Hints
Easter eggs reference each other:
- Delete counter hints at logo clicking
- Logo clicking hints at Konami code
- Creates a discovery chain

## Technical Implementation Notes

### Event Handling
- Click events: `@click="method"`
- Double-click events: `@dblclick="method"`
- Keyboard events: `addEventListener('keydown', handler)`

### State Management
- Component data properties track counters
- Vuex store not used for easter eggs (component-local state)
- Reset counters after triggering

### User Experience
- Visual feedback through alerts
- Audio feedback where appropriate
- Animations for dramatic effect
- Helpful hints between easter eggs

### Error Handling
- Audio playback wrapped in try-catch
- Graceful degradation if features fail
- No console errors from easter eggs

## Educational Value

These easter eggs demonstrate:

1. **Event Handling**: Click, double-click, and keyboard events
2. **State Management**: Tracking user interactions over time
3. **Conditional Logic**: If/else statements and complex conditions
4. **Array Operations**: Push, shift, and every methods
5. **Timers**: setTimeout for delayed actions
6. **DOM Manipulation**: Direct style changes for animations
7. **Audio Integration**: Web Audio API usage
8. **User Experience**: Providing feedback and rewards

## Future Enhancements

Potential additions:
- More complex gesture recognition
- Local storage persistence for easter egg achievements
- Achievement system with progress tracking
- Sound effects for each easter egg
- Visual animations beyond simple transforms
- Time-based easter eggs (e.g., specific times of day)

## Accessibility Considerations

- All easter eggs are discoverable without assistive technology
- Visual feedback is provided for all interactions
- No easter eggs interfere with normal app functionality
- Audio easter eggs have visual fallbacks