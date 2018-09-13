package services;

import models.ShopDTO;
import models.UserDTO;
import util.DomainValidation;

public interface ShopService {
    ShopDTO createShop(String name, String domain, UserDTO user);
    DomainValidation validateShopDetails(String domain);
}
