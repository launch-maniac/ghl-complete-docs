/**
 * Emoji utility for conditional emoji display based on environment variables
 *
 * Usage:
 * - Default: Shows emojis normally
 * - NO_EMOJI=true or DISABLE_EMOJIS=true: Returns empty string or fallback text
 *
 * Examples:
 * - getEmoji('🔥') → '🔥' (normal) or '' (disabled)
 * - getEmoji('✅', '[SUCCESS]') → '✅' (normal) or '[SUCCESS]' (disabled)
 */

/**
 * Check if emojis should be disabled based on environment variables
 * @returns {boolean} True if emojis should be disabled
 */
function shouldDisableEmojis() {
  return process.env.NO_EMOJI === 'true' ||
         process.env.DISABLE_EMOJIS === 'true' ||
         process.env.NO_EMOJI === '1' ||
         process.env.DISABLE_EMOJIS === '1';
}

/**
 * Get emoji or fallback text based on environment configuration
 * @param {string} emoji - The emoji to display
 * @param {string} fallback - Fallback text when emojis are disabled (default: empty string)
 * @returns {string} The emoji or fallback text
 */
function getEmoji(emoji, fallback = '') {
  return shouldDisableEmojis() ? fallback : emoji;
}

/**
 * Get emoji with automatic space handling
 * When emojis are disabled, this ensures proper spacing
 * @param {string} emoji - The emoji to display
 * @param {string} fallback - Fallback text when emojis are disabled
 * @returns {string} The emoji with space or fallback text
 */
function getEmojiWithSpace(emoji, fallback = '') {
  if (shouldDisableEmojis()) {
    return fallback ? `${fallback} ` : '';
  }
  return `${emoji} `;
}

module.exports = {
  getEmoji,
  getEmojiWithSpace,
  shouldDisableEmojis
};