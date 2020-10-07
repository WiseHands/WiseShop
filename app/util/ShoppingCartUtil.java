package util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import play.Play;
import play.mvc.Http;

public class ShoppingCartUtil {

    public static String _getCartUuid(Http.Request request) {
        String cartId = null;

        if (request.params.get("cartId") != null) {
            cartId = request.params.get("cartId");
        } else {
            if(request.cookies.get("JWT_TOKEN") == null) {
                return null;
            }
            String userTokenCookie = request.cookies.get("JWT_TOKEN").value;
            System.out.println("userTokenCookie: " + userTokenCookie);

            try {
                String encodingSecret = Play.configuration.getProperty("jwt.secret");
                Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("wisehands")
                        .build(); //Reusable verifier instance
                DecodedJWT jwt = verifier.verify(userTokenCookie);
                cartId = jwt.getSubject();
                System.out.println("cartId: " + cartId);
            } catch (JWTVerificationException exception) {
                System.out.println("Invalid Authorization header: " + userTokenCookie);
            }
        }
        return cartId;
    }

}
