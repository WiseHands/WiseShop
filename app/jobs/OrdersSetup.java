package jobs;

import enums.OrderState;
import models.OrderDTO;
import models.ProductDTO;
import org.hibernate.criterion.Order;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class OrdersSetup extends Job {

    public void doJob() throws Exception {
        boolean isDBEmpty = OrderDTO.findAll().size() == 0;
//        if (isDBEmpty){
//            OrderDTO order = new OrderDTO("Test NEW", "0630386173", "Lviv, Virm", "SELFTAKE", null);
//            order.total = 250.0;
//            order.save();
//
//            order = new OrderDTO("Test PAYED", "0630386173", "Lviv, Virm", "SELFTAKE", null);
//            order.state = OrderState.PAYED;
//            order.total = 250.0;
//            order.save();
//
//            order = new OrderDTO("Test SHIPPED", "0630386173", "Lviv, Virm", "SELFTAKE", null);
//            order.state = OrderState.SHIPPED;
//            order.total = 250.0;
//            order.save();
//
//            order = new OrderDTO("Test CANCELLED", "0630386173", "Lviv, Virm", "SELFTAKE", null);
//            order.state = OrderState.CANCELLED;
//            order.total = 250.0;
//            order.save();
//
//            order = new OrderDTO("Test RETURNED", "0630386173", "Lviv, Virm", "SELFTAKE", null);
//            order.state = OrderState.RETURNED;
//            order.total = 250.0;
//            order.save();
//        }
    }

}
