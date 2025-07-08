/**
 * Haptic feedback utility for mobile interactions
 */

export const HapticFeedback = {
  /**
   * Light haptic feedback for subtle interactions
   */
  light() {
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  },

  /**
   * Medium haptic feedback for button clicks
   */
  medium() {
    if ('vibrate' in navigator) {
      navigator.vibrate(100)
    }
  },

  /**
   * Heavy haptic feedback for important actions
   */
  heavy() {
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }
  },

  /**
   * Success haptic feedback pattern
   */
  success() {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  },

  /**
   * Error haptic feedback pattern
   */
  error() {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }
  },

  /**
   * Selection haptic feedback
   */
  selection() {
    if ('vibrate' in navigator) {
      navigator.vibrate(25)
    }
  },

  /**
   * Notification haptic feedback
   */
  notification() {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50])
    }
  },

  /**
   * Check if device supports vibration
   */
  isSupported() {
    return 'vibrate' in navigator
  }
}

export default HapticFeedback