package control; 
import model.Login;
import java.sql.*;
import javax.swing.JOptionPane;
public class HandleLogin {
   Connection con;
   PreparedStatement preSql;
   ResultSet rs;  
   public HandleLogin(){
      try{  Class.forName("com.mysql.jdbc.Driver");
      }
      catch(Exception e){}
      String uri = "jdbc:mysql://localhost:3306/ticket?useSSL=true";
      try{  
         con = DriverManager.getConnection(uri,"root",""); 
      }
      catch(SQLException e){}
   }
   public Login queryVerify(Login loginModel) {
      String id = loginModel.getID();
      String pw = loginModel.getPassword();
      String sqlStr ="select username,password from registration where "+
                      "username = ? and password = ?";
      try { 
          preSql = con.prepareStatement(sqlStr);
          preSql.setString(1,id);       
          preSql.setString(2,pw);  
          rs = preSql.executeQuery(); 
          if(rs.next()==true) {
             loginModel.setLoginSuccess(true);
             JOptionPane.showMessageDialog(null,"Login Successful!",
                     "You can play!",JOptionPane.WARNING_MESSAGE);
          }
          else {
             loginModel.setLoginSuccess(false);
             JOptionPane.showMessageDialog(null,"Login Failure.",
                     "Please login again",JOptionPane.WARNING_MESSAGE);
          }
          con.close();
      }
      catch(SQLException e) {}
      return loginModel;
   }
}
