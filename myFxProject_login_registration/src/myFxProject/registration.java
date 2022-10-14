package myFxProject;
import javafx.application.Application; 
import javafx.collections.FXCollections; 
import javafx.collections.ObservableList; 

import javafx.geometry.Insets; 
import javafx.geometry.Pos; 

import javafx.scene.Scene; 
import javafx.scene.control.Button; 
import javafx.scene.control.CheckBox; 
import javafx.scene.control.ChoiceBox; 
import javafx.scene.control.DatePicker; 
import javafx.scene.control.ListView; 
import javafx.scene.control.RadioButton; 
import javafx.scene.layout.GridPane; 
import javafx.scene.text.Text; 
import javafx.scene.control.TextField; 
import javafx.scene.control.ToggleGroup;  
import javafx.scene.control.ToggleButton; 
import javafx.stage.Stage; 
         
public class registration extends Application { 
   @Override 
   public void start(Stage stage) {    
      //Label for name 
      Text nameLabel = new Text("Name"); 
      
      //Text field for name 
      TextField nameText = new TextField(); 
       
      //Label for date of birth 
      Text dobLabel = new Text("Date of birth"); 
      
      //date picker to choose date 
      DatePicker datePicker = new DatePicker(); 
       
      //Label for gender
      Text genderLabel = new Text("gender"); 
      
      //Toggle group of radio buttons       
      ToggleGroup groupGender = new ToggleGroup(); 
      RadioButton maleRadio = new RadioButton("male"); 
      maleRadio.setToggleGroup(groupGender); 
      RadioButton femaleRadio = new RadioButton("female"); 
      femaleRadio.setToggleGroup(groupGender); 
       
     
     
       
     
    
      //button for register 
      Button buttonRegister = new Button("Register");  
      
      //Creating a Grid Pane 
      GridPane gridPane = new GridPane();    
      
      //Setting size for the pane 
      gridPane.setMinSize(500, 500); 
       
      //Setting the padding    
      gridPane.setPadding(new Insets(10, 10, 10, 10));  
      
       
      
      //Setting the Grid alignment 
      gridPane.setAlignment(Pos.CENTER); 
       
      //Arranging all the nodes in the grid 
      gridPane.add(nameLabel, 0, 0); 
      gridPane.add(nameText, 1, 0); 
       
      gridPane.add(dobLabel, 0, 1);       
      gridPane.add(datePicker, 1, 1); 
      
      gridPane.add(genderLabel, 0, 2); 
      gridPane.add(maleRadio, 1, 2);       
      gridPane.add(femaleRadio, 2, 2); 
    
       
      gridPane.add(buttonRegister, 2, 8);      
      
      //Styling nodes   
      buttonRegister.setStyle(
         "-fx-background-color: darkslateblue; -fx-textfill: white;"); 
       
      nameLabel.setStyle("-fx-font: normal bold 15px 'serif' "); 
      dobLabel.setStyle("-fx-font: normal bold 15px 'serif' "); 
      genderLabel.setStyle("-fx-font: normal bold 15px 'serif' "); 
     
      //Setting the back ground color 
      gridPane.setStyle("-fx-background-color: BEIGE;");       
       
      //Creating a scene object 
      Scene scene = new Scene(gridPane); 
      
      //Setting title to the Stage 
      stage.setTitle("Registration Form"); 
         
      //Adding scene to the stage 
      stage.setScene(scene);  
      
      //Displaying the contents of the stage 
      stage.show(); 
   }      
   public static void main(String args[]){ 
      launch(args); 
   } 
}
