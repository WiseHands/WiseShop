package controllers;

import enums.TransactionStatus;
import enums.TransactionType;
import models.*;
import responses.JsonHandleForbidden;

import java.util.List;

import static controllers.WizardAPI.getUserIdFromAuthorization;

public class PricingPlanAPI extends AuthController {

    public static void creatingPricingPlan(String client) throws Exception{

        String planName = request.params.get("planName");
        Double commissionFee = Double.valueOf(request.params.get("commissionFee"));
        Double monthlyFee = Double.valueOf(request.params.get("monthlyFee"));

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();

        System.out.println("PARAMS: => " + planName + "/*/" + commissionFee);

        if (user.isSuperUser){
            PricingPlanDTO pricingPlan = new PricingPlanDTO(planName, commissionFee, monthlyFee);
            pricingPlan.save();
            getPricingPlanList();
        } else {
            JsonHandleForbidden jsonHandle = new JsonHandleForbidden(403, "user isn't super admin");
            System.out.println("jsonHandle: " + jsonHandle.toString());
            renderJSON(json(jsonHandle));
        }

    }

    public static void getPricingPlanList() throws Exception{
        List<PricingPlanDTO> pricingPlanList = PricingPlanDTO.findAll();
        renderJSON(json(pricingPlanList));
    }

    public static void updatingPricingPlan() throws Exception{

        String pricingPlanUuid = request.params.get("uuid");
        String name = request.params.get("name");
        Double commissionFee = Double.valueOf(request.params.get("commissionFee"));
        Double monthlyFee = Double.valueOf(request.params.get("monthlyFee"));


        System.out.println("updatingPricingPlan " + pricingPlanUuid + ":"+ commissionFee  + ":"+ name);

        PricingPlanDTO pricing = PricingPlanDTO.findById(pricingPlanUuid);
        pricing.name = name;
        pricing.commissionFee = commissionFee;
        pricing.monthlyFee = monthlyFee;
        pricing.save();


        renderJSON(json(pricing));
    }

    public static void deletingPricingPlan() throws Exception{

        String pricingPlanUuid = request.params.get("uuid");
        System.out.println("deletingPricingPlan " + pricingPlanUuid);

        PricingPlanDTO pricing = PricingPlanDTO.findById(pricingPlanUuid);
        pricing.delete();

        JsonHandleForbidden json = new JsonHandleForbidden(200, "deleting plan successful");
        renderJSON(json(json));
    }

    public static void setPricingPlanToThisShop() throws Exception{

        String pricingPlanUuid = request.params.get("pricingPlanUuid");
        String shopUuid = request.params.get("shopUuid");

        System.out.println("pricingPlanUuid\n" + pricingPlanUuid + "\n" + "shopUuid\n" + shopUuid);

        ShopDTO shop = ShopDTO.findById(shopUuid);
        PricingPlanDTO pricingPlan = PricingPlanDTO.findById(pricingPlanUuid);

        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        if(coinAccount == null) {
            coinAccount = new CoinAccountDTO(shop);
            coinAccount = coinAccount.save();
        }
        if (coinAccount.balance < pricingPlan.monthlyFee) {
            JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(
                    420, "Недостатньо коштів для підключення тарифу", shop);
            renderJSON(json(jsonHandleForbidden));
        }

        CoinTransactionDTO transaction = new CoinTransactionDTO();
        transaction.type = TransactionType.CHANGE_PRICING_PLAN;
        transaction.status = TransactionStatus.OK;
        transaction.account = coinAccount;
        transaction.amount = -pricingPlan.monthlyFee;
        transaction.time = System.currentTimeMillis() / 1000L;
        transaction = transaction.save();
        coinAccount.addTransaction(transaction);
        coinAccount.balance += -pricingPlan.monthlyFee;
        coinAccount.save();
        shop.pricingPlan = pricingPlan;
        shop.coinAccount = coinAccount;
        shop.save();

        renderJSON(json(shop));
    }

    public static void getShopByUuid() throws Exception{
        String shopUuid = request.params.get("shopUuid");
        ShopDTO shop = ShopDTO.findById(shopUuid);
        renderJSON(json(shop));
    }

}
