# Vapid

[VAPID](https://datatracker.ietf.org/doc/draft-thomson-webpush-vapid/) allows a server to identify itself to a push
service. Using VAPID is not required, but it will be used for upcoming features such as
[Mozilla's Push Dashboard](https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/).

## Generate a Keypair

VAPID relies on asymmetric elliptic curve cryptography. You will need to create a keypair on your server. This can be
done with OpenSSL:

1. Generate a private key using `openssl ecparam -name prime256v1 -genkey -noout -out vapid_private.pem`.
2. Generate the corresponding public key using `openssl ec -in vapid_private.pem -pubout -out vapid_public.pem`.

You can view the public and private key using `openssl ec -in vapid_private.pem -text -noout -conv_form uncompressed`.
The output should look similar to:

```
read EC key
Private-Key: (256 bit)
priv:
    4d:19:58:ff:bc:90:ce:fa:9c:2e:98:07:41:3c:62:
    53:97:d5:cc:00:2f:03:0f:dc:75:28:79:90:b1:4b:
    36:a8
pub:
    04:e1:fc:9d:34:00:e6:26:61:97:6d:fe:34:2c:c6:
    1b:da:6b:bc:e6:79:04:4d:0c:25:70:56:f8:65:24:
    40:8b:d1:55:35:41:df:62:71:99:7d:15:d6:3e:b3:
    d2:be:eb:9d:3e:fe:6e:08:ba:7f:68:39:7c:c3:e9:
    02:1e:5b:ae:a3
ASN1 OID: prime256v1
```

## Client Side

The [PushManager.subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe#Parameters) method accepts an optional `options` object as parameter. This object can have a `applicationServerKey` property, which is the public key your push server will use to send messages to client apps via a push server.

The public key should be encoded in uncompressed form (i.e. 65 octets starting with 0x04). For example, for the above public key this may look like:

```javascript
const publicKey = new Uint8Array([0x04,0xe1,0xfc,0x9d,0x34,0x00,0xe6,0x26,0x61,0x97,0x6d,0xfe,0x34,0x2c,0xc6,0x1b,0xda,0x6b,0xbc,0xe6,0x79,0x04,0x4d,0x0c,0x25,0x70,0x56,0xf8,0x65,0x24,0x40,0x8b,0xd1,0x55,0x35,0x41,0xdf,0x62,0x71,0x99,0x7d,0x15,0xd6,0x3e,0xb3,0xd2,0xbe,0xeb,0x9d,0x3e,0xfe,0x6e,0x08,0xba,0x7f,0x68,0x39,0x7c,0xc3,0xe9,0x02,0x1e,0x5b,0xae,0xa3]);

navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
    })
    .then(function (subscription) {
        return sendSubscriptionToServer(subscription);
    });
});
```

## Server Side

The server needs both the public and private key. It is up to you how to encode the key. The next two sections provide two alternative ways of doing this.

### Read the PEM directly

Alternatively, you can read the PEM file directly. First add a dependency on BouncyCastle's PKIX API:

`compile group: 'org.bouncycastle', name: 'bcpkix-jdk15on', version: '1.55'`

The PKIX API provides the `openssl` package which you can use to directly read a PEM file:

```java
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;

...

try (InputStreamReader inputStreamReader = new InputStreamReader(getClass().getResourceAsStream("/vapid.pem"))) {
    PEMParser pemParser = new PEMParser(inputStreamReader);
    PEMKeyPair pemKeyPair = (PEMKeyPair) pemParser.readObject();

    return new JcaPEMKeyConverter().getKeyPair(pemKeyPair);
} catch (IOException e) {
    throw new IOException("The private key could not be decrypted", e);
}
```

### Read as base64 encoded strings

One way to do this is by encoding the public and private key as base64 strings and using `Utils.loadPublicKey` and `Utils.loadPrivateKey` to convert the base64 encoding to `PublicKey` and `PrivateKey` objects. To compute the base64 encoding is by using nodejs:

```javascript
> var publicKey = new Buffer([0x04,0xe1,0xfc,0x9d,0x34,0x00,0xe6,0x26,0x61,0x97,0x6d,0xfe,0x34,0x2c,0xc6,0x1b,0xda,0x6b,0xbc,0xe6,0x79,0x04,0x4d,0x0c,0x25,0x70,0x56,0xf8,0x65,0x24,0x40,0x8b,0xd1,0x55,0x35,0x41,0xdf,0x62,0x71,0x99,0x7d,0x15,0xd6,0x3e,0xb3,0xd2,0xbe,0xeb,0x9d,0x3e,0xfe,0x6e,0x08,0xba,0x7f,0x68,0x39,0x7c,0xc3,0xe9,0x02,0x1e,0x5b,0xae,0xa3]);
> publicKey.toString('base64');
'BOH8nTQA5iZhl23+NCzGG9prvOZ5BE0MJXBW+GUkQIvRVTVB32JxmX0V1j6z0r7rnT7+bgi6f2g5fMPpAh5brqM='


> var privateKey = new Buffer([0x4d,0x19,0x58,0xff,0xbc,0x90,0xce,0xfa,0x9c,0x2e,0x98,0x07,0x41,0x3c,0x62,0x53,0x97,0xd5,0xcc,0x00,0x2f,0x03,0x0f,0xdc,0x75,0x28,0x79,0x90,0xb1,0x4b,0x36,0xa8]);
> privateKey.toString('base64');
'TRlY/7yQzvqcLpgHQTxiU5fVzAAvAw/cdSh5kLFLNqg='
```

Use these strings to configure the `PushService`:

```java
pushService.setPublicKey(Utils.loadPublicKey("BOH8nTQA5iZhl23+NCzGG9prvOZ5BE0MJXBW+GUkQIvRVTVB32JxmX0V1j6z0r7rnT7+bgi6f2g5fMPpAh5brqM="));
pushService.setPrivateKey(Utils.loadPrivateKey("TRlY/7yQzvqcLpgHQTxiU5fVzAAvAw/cdSh5kLFLNqg="));
```
