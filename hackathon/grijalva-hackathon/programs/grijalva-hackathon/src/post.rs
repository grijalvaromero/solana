use anchor_lang::prelude::*;

#[account]
pub struct Post {
    pub author: Pubkey,

    pub time_zone: i8,
    pub year: u8,
    pub month: u8,
    pub day: u8,
    pub hour: u8,
    pub minutes: u8,
    pub seconds: u8,

    pub like: u64,

    pub hashtag: String,
    pub content: String,
    pub url: String,

    pub likes: Vec<Pubkey>,
}

impl Post {
    pub const SPACE: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.

        + TIMESZONE_LENGTH // TIME.
        + YEAR_LENGTH // TIME.
        + MONTH_LENGTH // TIME.
        + DAY_LENGTH // TIME.
        + HOUR_LENGTH // TIME.
        + MINUTES_LENGTH // TIME.
        + SECONDS_LENGTH // TIME.

        + LIKE_LENGTH // Like.

        + HASHTAG_LENGTH // Hashtag.
        + CONTENT_LENGTH // Content.
        + URL_LENGTH // Url.

        + LIKES_LENGTH; // Likes
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;

const TIMESZONE_LENGTH: usize = 1;
const YEAR_LENGTH: usize = 1;
const MONTH_LENGTH: usize = 1;
const DAY_LENGTH: usize = 1;
const HOUR_LENGTH: usize = 1;
const MINUTES_LENGTH: usize = 1;
const SECONDS_LENGTH: usize = 1;

const LIKE_LENGTH: usize = 8;

const HASHTAG_LENGTH: usize = 22;
const CONTENT_LENGTH: usize = 280;
const URL_LENGTH: usize = 90;

const LIKES_LENGTH: usize = 32 * 10;