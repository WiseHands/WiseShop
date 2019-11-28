package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import models.*;
import play.Play;
import java.util.ArrayList;

public class ShoppingCartAPI extends AuthController {
    public void getCart() {
        String userTokenCookie = request.cookies.get("userToken").value;
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(userTokenCookie);
            String userId = jwt.getSubject();
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(userId);
            renderJSON(json(shoppingCart));

        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header: " + userTokenCookie);
        }

    }

    public void addProduct() {
        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        int quantity = 1;
        String quantityParam = request.params.get("quantity");
        if(quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }

        String userTokenCookie = request.cookies.get("userToken").value;
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(userTokenCookie);
            String userId = jwt.getSubject();
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(userId);


            LineItemDTO lineItem = new LineItemDTO();
            if (shoppingCart == null) {
                shoppingCart = new ShoppingCartDTO();
                shoppingCart.uuid = userId;
            }


            if(shoppingCart.lineItemList == null) {
                shoppingCart.lineItemList = new ArrayList<>();
            }


            if(shoppingCart.lineItemList.size() == 0){
                lineItem.product = product;
                lineItem.quantity = quantity;
                lineItem = lineItem.save();

                shoppingCart.lineItemList.add(lineItem);
                shoppingCart.save();
            } else {


                boolean isProductUnique = false;
                for (LineItemDTO lineItems : shoppingCart.lineItemList) {
                    if (productUuid.equals(lineItems.product.uuid)) {
                        isProductUnique = true;
                        lineItems.quantity = lineItems.quantity + quantity;
                        lineItems.save();
                    }
                }


                if (!isProductUnique) {
                    lineItem.product = product;
                    lineItem.quantity = quantity;
                    lineItem = lineItem.save();

                    shoppingCart.lineItemList.add(lineItem);
                    shoppingCart.save();
                }

            }




            getCart();
        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header: " + userTokenCookie);
        }
    }

    public void deleteProduct() {
        String lineItemUuid = request.params.get("uuid");

        String userTokenCookie = request.cookies.get("userToken").value;
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(userTokenCookie);
            String userId = jwt.getSubject();
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(userId);

            LineItemDTO lineItemToRemove = null;
            for (LineItemDTO lineItem : shoppingCart.lineItemList) {
//                System.out.println("lineItem.uuid " + lineItem.uuid);
//                System.out.println("lineItemUuid " + lineItemUuid);
                if(lineItem.uuid.equals(lineItemUuid)) {
                    lineItemToRemove = lineItem;
                }
            }
            shoppingCart.lineItemList.remove(lineItemToRemove);
            shoppingCart.save();

            LineItemDTO lineItem = LineItemDTO.findById(lineItemUuid);
            lineItem.delete();

            if(shoppingCart.lineItemList.size() == 0){
                shoppingCart.delete();
            }
        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header: " + userTokenCookie);
        }

        getCart();
    }

    public void increaseQuantityProduct(){

        String lineItemUuid = request.params.get("uuid");

        LineItemDTO lineItem = LineItemDTO.findById(lineItemUuid);
        lineItem.quantity += 1;
        lineItem.save();

        getCart();

    }

}
