package controllers;

import models.OrderItemDTO;
import models.ProductDTO;

public class ShoppingCartAPI extends AuthController {
    public void addProduct() throws Exception {
        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        Integer quantity = Integer.parseInt(request.params.get("quantity"));
        System.out.println(product + quantity.toString());
    }

}
