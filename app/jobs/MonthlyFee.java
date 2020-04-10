package jobs;

import enums.TransactionStatus;
import enums.TransactionType;
import models.CoinAccountDTO;
import models.CoinTransactionDTO;
import models.ShopDTO;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import play.Logger;
import play.jobs.*;

import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@On("0 0 12 * * ?")
public class MonthlyFee extends Job {

    public void doJob() throws Exception {
        System.out.println("MonthlyFee job");

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");


        Calendar calendar = Calendar.getInstance();   // this takes current date
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        Long currentTimeInMmSec = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeInMmSec);

        boolean isTodayFirstDayOfCurrentMonth = calendar.getTime().equals(currentDate);
        System.out.println("MonthlyFee job isTodayFirstDayOfCurrentMonth => " + isTodayFirstDayOfCurrentMonth);
        Logger.info("MonthlyFee job isTodayFirstDayOfCurrentMonth => " + isTodayFirstDayOfCurrentMonth);

        if (isTodayFirstDayOfCurrentMonth){
            List<ShopDTO> shopList = ShopDTO.findAll();
            for (ShopDTO shop : shopList){
                if (shop.pricingPlan != null){
                    CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
                    if(coinAccount == null) {
                        coinAccount = new CoinAccountDTO(shop);
                        coinAccount = coinAccount.save();
                    }
                    CoinTransactionDTO transaction = new CoinTransactionDTO();
                    transaction.type = TransactionType.MONTHLY_FEE;
                    transaction.status = TransactionStatus.OK;
                    transaction.account = coinAccount;
                    transaction.amount = -shop.pricingPlan.monthlyFee;
                    transaction.time = System.currentTimeMillis() / 1000L;
                    transaction = transaction.save();
                    coinAccount.addTransaction(transaction);
                    coinAccount.balance += transaction.amount;
                    coinAccount.save();
                    System.out.println("paid a monthly fee!!!!!!!!!!!");
                }
            }
        }

    }

    public void getMonthlyFee(ShopDTO shop) {

        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        Double commissionFee = shop.pricingPlan.commissionFee;

        if(coinAccount == null) {
            coinAccount = new CoinAccountDTO(shop);
            coinAccount = coinAccount.save();
        }
        CoinTransactionDTO transaction = new CoinTransactionDTO();
        transaction.type = TransactionType.MONTHLY_FEE;
        transaction.status = TransactionStatus.OK;
        transaction.account = coinAccount;
        transaction.amount = -commissionFee;
        transaction.time = System.currentTimeMillis() / 1000L;
        transaction = transaction.save();
        coinAccount.addTransaction(transaction);
        coinAccount.balance += transaction.amount;
        coinAccount.save();


    }

}
