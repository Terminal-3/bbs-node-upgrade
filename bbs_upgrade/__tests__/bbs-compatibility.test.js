const {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
} = require("@mattrglobal/bbs-signatures");

describe('BBS Signatures Compatibility', () => {
  test('should work with basic BBS operations', async () => {
    try {
      // Generate a new key pair
      const keyPair = await generateBls12381G2KeyPair();

      // Set of messages we wish to sign
      const messages = [
        Uint8Array.from(Buffer.from("message1", "utf-8")),
        Uint8Array.from(Buffer.from("message2", "utf-8")),
      ];

      // Create the signature
      const signature = await blsSign({
        keyPair,
        messages: messages,
      });

      // Verify the signature - handle object response
      const verifyResult = await blsVerify({
        publicKey: keyPair.publicKey,
        messages: messages,
        signature,
      });

      expect(verifyResult.verified).toBe(true);

      // Derive a proof from the signature revealing the first message
      const proof = await blsCreateProof({
        signature,
        publicKey: keyPair.publicKey,
        messages,
        nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
        revealed: [0],
      });

      // Verify the created proof - handle object response
      const proofResult = await blsVerifyProof({
        proof,
        publicKey: keyPair.publicKey,
        messages: messages.slice(0, 1),
        nonce: Uint8Array.from(Buffer.from("nonce", "utf8")),
      });

      expect(proofResult.verified).toBe(true);
      
      console.log('✓ BBS Signatures work perfectly with Node v22!');
    } catch (error) {
      console.error('BBS Signatures failed with Node v22:', error.message);
      throw error;
    }
  });
});