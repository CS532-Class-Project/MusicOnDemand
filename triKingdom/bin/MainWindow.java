package bin;
import view.RegisterAndLoginView;
import javax.swing.*;

import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;

import java.awt.*;
import java.awt.event.*;
public class MainWindow extends JFrame implements ActionListener{
   JButton computerButton; 
   RegisterAndLoginView view;
   JLabel infLabel=new JLabel("");
   MainWindow() {
      setBounds(100,100,800,260);
      view = new RegisterAndLoginView();
      computerButton = new JButton("Play Game After Login.");
      
      computerButton.addActionListener(this);
      add(view,BorderLayout.CENTER);
      add(computerButton,BorderLayout.NORTH);
    //  actionresult.setFont(Font.font("Tahoma", FontWeight.NORMAL, 20));
      add(infLabel,BorderLayout.SOUTH);
      setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
      setVisible(true); 
   }
   public void actionPerformed(ActionEvent e) {
      if(view.isLoginSuccess()==false){
    	
    	  //infLabel.repaint();
        JOptionPane.showMessageDialog(null,"login","login tips",
                                   JOptionPane.WARNING_MESSAGE);
      }
      else {
    	//  actionresult.setFill(Color.FIREBRICK);
    	 
         Hua_Rong_Road win=new Hua_Rong_Road();//»ªÈÝµÀ
      }
   }
   public static void main(String args[]) {
       MainWindow window = new MainWindow();
       window.setTitle("Club Members Only, Please Registrate!");
   }
}