package myFxProject;
import java.sql.Connection;  
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class connect {  
   
    public static void connectLog(String name, String psw) {  
    	Connection conn;  
    	PreparedStatement preSql;
        ResultSet rs;
        String sqlStr ="select name,psw from v2 where "+
            "name = ? and psw = ?";     
    	conn = null;
    	
        try {  
            // db parameters  
            String url = "jdbc:sqlite:guest.db";  
            // create a connection to the database  
            conn = DriverManager.getConnection(url);  
              
       //     System.out.println("Connection to SQLite has been established.");  
              
            preSql = conn.prepareStatement(sqlStr);
            preSql.setString(1,name);       
            preSql.setString(2,psw);  
            rs = preSql.executeQuery(); 
            if(rs.next()==true) {
          	   System.out.println("Login Successful");
          	   conn.close();
            } else{
               System.out.println("Enter Valid username and password");
            }
         }catch(SQLException e) {System.out.println("sql exception");}
  }
}
  