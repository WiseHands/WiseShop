package nl.martijndwars.webpush;

import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;

import java.io.IOException;
import java.io.InputStreamReader;
import java.security.*;

public class TestUtils {
    /**
     * Read the VAPID key from the .pem file in the resources folder.
     *
     * @return
     * @throws IOException
     */
    public static KeyPair readVapidKeys() throws IOException {
        try (InputStreamReader inputStreamReader = new InputStreamReader(TestUtils.class.getResourceAsStream("/vapid.pem"))) {
            PEMParser pemParser = new PEMParser(inputStreamReader);
            PEMKeyPair pemKeyPair = (PEMKeyPair) pemParser.readObject();

            return new JcaPEMKeyConverter().getKeyPair(pemKeyPair);
        } catch (IOException e) {
            throw new IOException("The private key could not be decrypted", e);
        }
    }

    /**
     * Generate a public-private keypair on the prime256v1 curve.
     *
     * @return
     * @throws NoSuchProviderException
     * @throws NoSuchAlgorithmException
     * @throws InvalidAlgorithmParameterException
     */
    public static KeyPair generateVapidKeys() throws NoSuchProviderException, NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("ECDSA", "BC");
        keyPairGenerator.initialize(ECNamedCurveTable.getParameterSpec("prime256v1"), new SecureRandom());

        return keyPairGenerator.generateKeyPair();
    }
}
