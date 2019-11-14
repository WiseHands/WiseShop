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
        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        int quantity = Integer.parseInt(request.params.get("quantity"));
        System.out.println(product + Integer.toString(quantity));

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
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(userId);
            if (shoppingCart == null) {
                shoppingCart = new ShoppingCartDTO();
                shoppingCart.uuid = userId;
            }
            if(shoppingCart.lineItemList == null) {
                shoppingCart.lineItemList = new ArrayList<>();
            }
            if(shoppingCart.lineItemList.size() == 0){
                LineItemDTO lineItem = new LineItemDTO();
                lineItem.product = product;
                lineItem.quantity = quantity;
                lineItem = lineItem.save();

                shoppingCart.lineItemList.add(lineItem);
                System.out.println("shoppingCart.lineItemList 1" + shoppingCart.lineItemList);
                shoppingCart.save();
            } /*else if(shoppingCart.lineItemList.size() > 0){
                LineItemDTO lineItem = new LineItemDTO();
                    lineItem.product = product;
                    lineItem.quantity = quantity;
                    lineItem = lineItem.save();

                    System.out.println("shoppingCart.lineItemList 0" + shoppingCart.lineItemList);
                    shoppingCart.lineItemList.add(lineItem);
                    shoppingCart.save();
                }*/
                for (LineItemDTO lineItems : shoppingCart.lineItemList) {
                    if (productUuid.equals(lineItems.product.uuid)) {
                        lineItems.quantity = lineItems.quantity + quantity;
                        lineItems = lineItems.save();
                    }
                    System.out.println("lineItem.uuid " + lineItems.uuid);
                    System.out.println("productUuid " + productUuid);
                    System.out.println("lineItem.product.uuid " + lineItems.product.uuid);
                    //System.out.println("lineItem " + shoppingCart.lineItemList.get(0).product);
                }

            ok();
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

        ok();
    }

}
