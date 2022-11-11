package view;
import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import model.*;
import control.*;
public class LoginView extends JPanel implements ActionListener {
   Login login;
   JTextField inputID;
   JPasswordField inputPassword;
   JButton buttonLogin;
   boolean loginSuccess;
   LoginView() {
      login = new Login();
      inputID = new JTextField(12);
      inputPassword = new JPasswordField(12);
      buttonLogin = new JButton("Login");
      add(new JLabel("ID:"));
      add(inputID);
      add(new JLabel("Password:"));
      add(inputPassword);
      add(buttonLogin); 
      buttonLogin.addActionListener(this);
   }
   public boolean isLoginSuccess() {
      return loginSuccess;    
   }
   public void actionPerformed(ActionEvent e) {
      login.setID(inputID.getText());
      char [] pw =inputPassword.getPassword();
      login.setPassword(new String(pw));
      HandleLogin handleLogin = new HandleLogin();
      login = handleLogin.queryVerify(login);
      loginSuccess = login.getLoginSuccess();
   }
}