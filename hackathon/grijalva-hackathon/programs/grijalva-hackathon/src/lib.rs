use anchor_lang::prelude::*;

//importamos los módulos  
mod post;
pub use crate::post::Post;

mod ctx;
pub use crate::ctx::*;

mod err;
pub use crate::err::ErrorCode;

declare_id!("Axjz97ru6cYMPJ1aKfMZNrrA8M9WzFQs5P7YDFGng8RG");

#[program]
pub mod miprograma {
    use super::*;
    pub fn send_post(
        //estructura de las cuentas
        ctx: Context<SendPost>, // this para java (las cuentas que interactuan)

        hashtag: String,
        content: String,
        url: String,

        tip: String,

        time_zone: i8,
        year: u8,
        month: u8,
        day: u8,
        hour: u8,
        minutes: u8,
        seconds: u8,
    ) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        

        if hashtag.chars().count() > 22 {
            return Err(ErrorCode::HashtagTooLong.into());
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        if url.chars().count() > 90 {
            return Err(ErrorCode::UrlTooLong.into());
        }

        post.author = *author.key;
        post.time_zone = time_zone;

        post.year = year;
        post.month = month;
        post.day = day;

        post.hour = hour;
        post.minutes = minutes;
        post.seconds = seconds;

        post.hashtag = hashtag;
        post.content = content;
        post.url = url;
        // Max likes 18 446 744 073 709 551 615
        post.like = 0;
        let tip: u64 = tip.parse::<u64>().unwrap();
        let payer_info: &Signer = &mut ctx.accounts.author;
        let to = &mut ctx.accounts.wallet_collector;
        let program_info = &ctx.accounts.system_program;

        assert!(to.key().to_string() != "");

        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &payer_info.key(),
            &to.key(),
            tip,
        );
        let required_accounts_for_create = &[
            payer_info.to_account_info().clone(),
            to.clone(),
            
            program_info.clone(),
        ][..];
        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            required_accounts_for_create,
        )?;
        Ok(())
    }

    pub fn edit_post(ctx: Context<EditPost>, hashtag: String, content: String) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;

        if hashtag.chars().count() > 22 {
            return Err(ErrorCode::HashtagTooLong.into());
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        post.hashtag = hashtag;
        post.content = content;
        Ok(())
    }

    pub fn like_post(ctx: Context<LikePost>, tip: String) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;

        post.like += 1;
        post.likes.push(*author.key);

        let tip: u64 = tip.parse::<u64>().unwrap();
        let payer_info: &Signer = &mut ctx.accounts.author;
        let to = &mut ctx.accounts.to;
        let program_info = &ctx.accounts.system_program;

        assert!(&to.key() == &post.author);

        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &payer_info.key(),
            &to.key(),
            tip,
        );
        let required_accounts_for_create = &[
            payer_info.to_account_info().clone(),
            to.clone(),
            program_info.clone(),
        ][..];
        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            required_accounts_for_create,
        )?;

        Ok(())
    }

    pub fn delete_post(_ctx: Context<DeletePost>) -> Result<()> {
        Ok(())
    }
}
