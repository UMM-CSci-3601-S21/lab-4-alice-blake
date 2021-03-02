package umm3601.todo;

//import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

//import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
//import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;


/**
* Tests the logic of the TodoController
*
* @throws IOException
*/
public class TodoControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private TodoController todoController;

  private ObjectId frysId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }


  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> todoDocuments = db.getCollection("todos");
    todoDocuments.drop();
    List<Document> testTodos = new ArrayList<>();
    testTodos.add(
      new Document()
      .append("owner", "Blanche")
      .append("status", false)
      .append("body", "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.")
      .append("category", "software design"));
    testTodos.add(
      new Document()
      .append("owner", "Blanche")
      .append("status", true)
      .append("body", "Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt cupidatat laboris commodo veniam do ut sint.")
      .append("category", "software design"));
    testTodos.add(
      new Document()
      .append("owner", "Blanche")
      .append("status", true)
      .append("body", "Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.")
      .append("category", "groceries"));
    testTodos.add(
      new Document()
      .append("owner", "Barry")
      .append("status", true)
      .append("body", "Nisi sit non non sunt veniam pariatur. Elit reprehenderit aliqua consectetur est dolor officia et adipisicing elit officia nisi elit enim nisi.")
      .append("category", "video games"));
    testTodos.add(
      new Document()
      .append("owner", "Blanche")
      .append("status", false)
      .append("body", "Laborum incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad. Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.")
      .append("category", "homework"));
    testTodos.add(
      new Document()
      .append("owner", "Workman")
      .append("status", false)
      .append("body", "Proident cupidatat exercitation id ullamco magna do qui aliquip id. Eiusmod labore non nostrud culpa duis incididunt incididunt esse occaecat amet officia.")
      .append("category", "homework"));


    frysId = new ObjectId();
    Document fry =
    new Document()
    .append("_id", frysId)
    .append("owner", "Fry")
    .append("status", true)
    .append("body", "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.")
    .append("category", "homework");

    todoDocuments.insertMany(testTodos);
    todoDocuments.insertOne(fry);

    todoController = new TodoController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllTodos() throws IOException {

    //Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    // The response status should be 200
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(db.getCollection("todos").countDocuments(), JavalinJson.fromJson(result, Todo[].class).length);
  }

  @Test
  public void GetTodosByOwner() throws IOException {

    // Set the query string to test with
    mockReq.setQueryString("owner=Blanche");

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");

    todoController.getTodos(ctx);

    // The response status should be 200
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(4, resultTodos.length); //There should be 4 todos returned
    for (Todo todo : resultTodos) {
      assertEquals("Blanche", todo.owner); //Every todo should be owner Blanche
    }
  }// body and category

@Test
public void getTodosByCategory() throws IOException{

  // Set the query string to test with
  mockReq.setQueryString("category=homework");

  // Create fake Javalin context
  Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");

  todoController.getTodos(ctx);

    // The response status should be 200
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(3, resultTodos.length); //There should be 3 todos returned
    for (Todo todo : resultTodos) {
      assertEquals("homework", todo.category); //Every todo should have the category 'homework'

}
} //end of Test for getTodosByCategory

@Test
public void getTodosByBody() throws IOException{
// Set the query string to test with
mockReq.setQueryString("body=dolore");

// Create fake Javalin context
Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");

todoController.getTodos(ctx);
// The response status should be 200
assertEquals(200, mockRes.getStatus());

String result = ctx.resultString();
Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

assertEquals(1, resultTodos.length); //There should be 1 todos returned
for (Todo todo : resultTodos) {
  assertEquals("Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.", todo.body); //Only one todo should return because there's only
  // one todo where 'dolore' appears in the body
  }
} // End of Test for getTodosByBody

  @Test
  public void GetTodosByStatus() throws IOException {

    mockReq.setQueryString("status=true");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();

    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(4, resultTodos.length);
    for(Todo todo : resultTodos) {
      assertEquals(true, todo.status);
    }
  }

  @Test
  public void GetTodosByOwnerAndCategory() throws IOException {

    mockReq.setQueryString("owner=Blanche&category=software design");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();

    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(2, resultTodos.length);
    for(Todo todo : resultTodos) {
      assertEquals("Blanche", todo.owner);
      assertEquals("software design", todo.category);
    }
  }

  @Test
  public void GetTodosByOwnerAndBody() throws IOException {

    mockReq.setQueryString("owner=Blanche&body=sint");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();

    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(3, resultTodos.length);
    for(Todo todo : resultTodos) {
      assertEquals("Blanche", todo.owner);
      //assertEquals("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.", todo.body);
      //assertEquals("Incididunt enim ea sit qui esse magna eu. Nisi sunt exercitation est Lorem consectetur incididunt cupidatat laboris commodo veniam do ut sint.", todo.body);
      //assertEquals("Laborum incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad. Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.", todo.body);
    }
  }

  @Test
  public void GetTodosByOwnerAndCategoryAndBody() throws IOException {

    mockReq.setQueryString("owner=Blanche&category=software design&body=sint");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();

    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(2, resultTodos.length);
    for(Todo todo : resultTodos) {
      assertEquals("Blanche", todo.owner);
      //assertEquals("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.", todo.body);
      assertEquals("software design", todo.category);

    }
  }




}


