package ex3;


public class lister {
	 public static void main(String[] args)  {
	//generate object wk, and wk lists all files or directories under dirpath
        worker wk=new worker();
        wk.dirpath="C:/Users/sally/eclipse-workspace/ex1";
		wk.list();
    }
}