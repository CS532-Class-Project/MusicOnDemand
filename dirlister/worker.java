package ex3;
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;
import java.nio.file.*;
public class worker {
  String dirpath;
  public void list(){
	 // fileList to save information of files or directories
	 List<String> fileList = new ArrayList<String>();
     
	 //stream as a Path DirectoryStream from a directory path 
	 try (DirectoryStream<Path> stream = Files
	   .newDirectoryStream(Paths.get(dirpath))) {
	   // for each path in the stream, generate information of the path
	   for (Path path : stream) {
	     if (!Files.isDirectory(path)) {
	     
	    	 Long lgq=Files.size(path);
	    	 if (Files.isRegularFile(path)) {
	    		 //if a path is a regular file
	        	 fileList.add("File---"+ lgq.toString() +"---"+ path.toString());
	    	 }
	    	 else {
	    		 fileList.add("Other---"+ lgq.toString() +"---"+ path.toString());
	         }
	     }
	     else {
	    	 Long lgq=Files.size(path); 
	    	 fileList.add("Dir---"+ lgq.toString() +"---"+ path.toString());
	     }
	   }
	 }catch(IOException ex) {
		 System.err.print("ERROR: Directory does not exist:\n");
		    ex.printStackTrace();
		    System.exit(1);
	 }
	 for (String st : fileList) {
		 System.out.println(st) ;
	 } 
  }
	 
}
