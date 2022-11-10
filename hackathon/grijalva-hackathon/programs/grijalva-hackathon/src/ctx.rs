use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

pub use crate::post::Post;

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post::SPACE)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we just pay to this account
    pub wallet_collector: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    /// CHECK: This is not dangerous because we just pay to this account
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct EditPost<'info> {
    #[account(mut, has_one = author)]
    pub post: Account<'info, Post>,
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct LikePost<'info> {
    #[account(mut)]
    pub post: Account<'info, Post>,
    pub author: Signer<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we just pay to this account
    pub to: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    /// CHECK: This is not dangerous because we just pay to this account
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(mut, has_one = author, close = author)]
    pub post: Account<'info, Post>,
    pub author: Signer<'info>,
}
