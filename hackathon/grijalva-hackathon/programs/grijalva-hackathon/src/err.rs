use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Hashtag should be 22 characters.")]
    HashtagTooLong,
    #[msg("Content should be 280 characters.")]
    ContentTooLong,
    #[msg("Url should be 90 characters.")]
    UrlTooLong,
}
