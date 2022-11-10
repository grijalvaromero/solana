import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GrijalvaHackathon } from "../target/types/grijalva_hackathon";

describe("grijalva-hackathon", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.GrijalvaHackathon as Program<GrijalvaHackathon>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
