package view;
import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import model.*;
import control.*;
public class RegisterView extends JPanel implements ActionListener {
   Register register;
   JTextField inputID,inputBirth;
   JPasswordField inputPassword;
   JButton buttonRegister;
   RegisterView() {
      register = new Register();
      inputID = new JTextField(12);
      inputPassword = new JPasswordField(12);
      inputBirth = new JTextField(12);
      buttonRegister = new JButton("Registrate");
      add(new JLabel("ID:"));
      add(inputID);
      add(new JLabel("Password:"));
      add(inputPassword);
      add(new JLabel("DateOfBirth(****-**-**):"));
      add(inputBirth);
      add(buttonRegister); 
      buttonRegister.addActionListener(this);
   }
   public void actionPerformed(ActionEvent e) {
      register.setID(inputID.getText());
      char [] pw =inputPassword.getPassword();
      register.setPassword(new String(pw));
      register.setBirth(inputBirth.getText());
      HandleInsertData handleRegister = new HandleInsertData();
      handleRegister.writeRegisterModel(register);  
   }
}