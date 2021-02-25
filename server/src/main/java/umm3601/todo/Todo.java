package umm3601.todo;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Todo {

  @ObjectId @Id
  public String _id;

  public String owner;
  public String status;
  public String category;
  public String body;
}
