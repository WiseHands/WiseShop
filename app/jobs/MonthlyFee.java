package jobs;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import play.jobs.*;

import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.Date;

@On("0 0 12 * * ?")
public class MonthlyFee extends Job {

    public void doJob() throws Exception {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");


        Calendar calendar = Calendar.getInstance();   // this takes current date
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        Long currentTimeInMmSec = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeInMmSec);

        if (calendar.getTime().equals(currentDate)){
            System.out.println("calendar.getTime().equals(currentDate)" + calendar.getTime().equals(currentDate));
            System.out.println("calendar.getTime() and (currentDate)" + calendar.getTime() +"\n"+ currentDate);
        }

    }

}
