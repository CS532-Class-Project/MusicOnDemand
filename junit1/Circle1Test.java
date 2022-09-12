
/***
* JUnit tests for classes Circle, Circle1, Circle2. Tests are for four functions, construction
* function, moveby, scale, * and intersects. Dr. Cook has given example on testing moveby, I am 
* going to test mainly scale and intersects functions. For scale function, the tests are chosen 
* for factor to be positive,0, and  negative. For moveby, test is that x=0, and y=0.
* For intersects function, the tests are chosen so that the two circles are tangent, intersecting, 
* and not intersecting. All points in this are from class Circle1.
***/

// Import all assertions and all annotations
// - see docs for lists and descriptions
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

public class Circle1Test
{
   // Define circles in class Circle1 for test use
   private Circle1 circle1, circle2, circle3, circle4;
//
// Stuff you want to do before each test case
//
@BeforeEach
public void setup()
{
   System.out.println("\nTest starting...");
   circle1 = new Circle1(1,2,2);
   circle2 = new Circle1(4,2,1);
   circle3 = new Circle1(3,0,1);
   circle4 = new Circle1(4,3,1);
}

//
// Stuff you want to do after each test case
//
@AfterEach
public void teardown()
{
   System.out.println("\nTest finished.");
}
//
// Test for construction function
//
@Test
public void testConstruction()
{
   System.out.println("Running testConstruction.");
   assertTrue(circle1.center.x == 1 && circle1.center.y == 2);
}
//
// Test a simple positive move
//
@Test
public void simpleMove()
{
   Point p;
   System.out.println("Running test simpleMove.");
   p = circle1.moveBy(1,1);
   assertTrue(p.x == 2 && p.y == 3);
}

// 
// Test a simple negative move
//
@Test
public void simpleMoveNeg()
{
   Point p;
   System.out.println("Running test simpleMoveNeg.");
   p = circle1.moveBy(-1,-1);
   assertTrue(p.x == 0 && p.y == 1);
}
// 
// Test a simple no move
//
@Test
public void noMove()
{
   Point p;
   System.out.println("Running test noMove.");
   p = circle1.moveBy(0,0);
   assertTrue(p.x == 1 && p.y == 2);
}
// Test tangent circles
//
@Test
public void intesectBoundary()
{
   boolean p;
   System.out.println("Running test intesectBoundary: tangent is not intersecting.");
   p = circle1.intersects(circle2);
   assertTrue(p== false);
}

// 
// Test intersects case
//
@Test
public void intesectsTwo()
{
   boolean p;
   System.out.println("Running test intesectsTwo.");
   p = circle1.intersects(circle3);
   assertTrue(p== true);
}

// 
// Test non intersecting case
//
@Test
public void intesectsNone()
{
   boolean p;
   System.out.println("Running test intesectsNone.");
   p = circle1.intersects(circle4);
   assertTrue(p== false);
}
//
// Test scale with positive factor
//
@Test
public void scalePos()
{
   double p;
   System.out.println("Running test of scalePos.");
   p = circle1.scale(5);
   assertTrue(p== 10);
}
// Test scale with negative factor
//
@Test
public void scaleNeg()
{
   double p;
   System.out.println("Running test of scaleNeg.");
   p = circle1.scale(-5);
   assertTrue(p== 2);
}
// Test scale with 0 factor
//
@Test
public void scaleZero()
{
   double p;
   System.out.println("Running test of scaleZero.");
   p = circle1.scale(0);
   assertTrue(p== 0);
}
}

