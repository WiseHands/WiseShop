package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import models.OrderItemDTO;
import models.ProductDTO;
import models.UserDTO;
import play.Play;
import play.mvc.Http;

public class ShoppingCartAPI extends AuthController {
    public void addProduct() throws Exception {
        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        Integer quantity = Integer.parseInt(request.params.get("quantity"));
        System.out.println(product + quantity.toString());

        String userTokenCookie = request.cookies.get("userToken").value;
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(userTokenCookie);
            String userId = jwt.getSubject();
        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header: " + userTokenCookie);
        }
    }

}
