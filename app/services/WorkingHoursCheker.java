
package services;


import org.joda.time.DateTime;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class WorkingHoursCheker {

    /**
     * checks if the date's time is in range between startTime and endTime
     * @return true if date's time is between startTime and endTime.
     * Example: at first, we need have three values of Date types:
     *  - startTime - is 8 February 10:30 2019
     *  - endTime - is 8 February 20:30 2019
     *  - date - is 8 February 16:20 2019
     * isWorkingTime method returns true, because date value is in the time range 10:30 - 20:30.
     *
     * ------
     * In the next example the method also returns true because we check only hours and minutes:
     *  - startTime - is 4 February 09:30 2017
     *  - endTime - is 8 April 19:30 2019
     *  - date - is 5 May 16:20 2019
     */


    public static boolean isWorkingTime(Date startTime, Date endTime, Date date){

        SimpleDateFormat formatK = new SimpleDateFormat("k");
        SimpleDateFormat formatM = new SimpleDateFormat("m");

        int firstMinute = Integer.parseInt(formatM.format(startTime));
        int firstHour = Integer.parseInt(formatK.format(startTime));
        int firstTime = firstHour * 60 + firstMinute;

        int lastMinute = Integer.parseInt(formatM.format(endTime));
        int lastHour = Integer.parseInt(formatK.format(endTime));
        int lastTime = lastHour * 60 + lastMinute;

        int currentHour = (Integer.parseInt(formatK.format(date)));
        int currentMinute = (Integer.parseInt(formatM.format(date)));
        int currentTime = currentHour * 60 + currentMinute;

        if (currentTime >= firstTime && currentTime < lastTime){
            return true;
        } else {
            return false;
        }
    }

}
