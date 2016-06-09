package jobs;

import models.ProductDTO;
import models.UserDTO;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class UsersSetup extends Job {
    private static final String SVYAT = "sviatoslav.p5@gmail.com";
    private static final String BOGDAN = "bohdaq@gmail.com";
    private static final String VOVA = "patlavovach@gmail.com";

    private static final String PASSWORD = "rjylbnth";


    public void doJob() throws Exception {
        boolean isDBEmpty = UserDTO.findAll().size() == 0;
        if (isDBEmpty){
            UserDTO user = new UserDTO(SVYAT, PASSWORD);
            user.save();

            user = new UserDTO(BOGDAN, PASSWORD);
            user.save();

            user = new UserDTO(VOVA, PASSWORD);
            user.save();
        }
    }

}
