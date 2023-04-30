# KaiburrTask1

Implement an application in java which provides a REST API with endpoints for searching,
creating and deleting “server” objects:
● GET servers. Should return all the servers if no parameters are passed. When server id
is passed as a parameter - return a single server or 404 if there’s no such a server.
● PUT a server. The server object is passed as a json-encoded message body. Here’s an
example:
{
“name”: ”my centos”,
“id”: “123”,
“language”:”java”,
“framework”:”django”
}
● DELETE a server. The parameter is a server ID.
● GET (find) servers by name. The parameter is a string. Must check if a server name
contains this string and return one or more servers found. Return 404 if nothing is found.
“Server” objects should be stored in MongoDB database.
Be sure that you can show how your application responds to requests using postman, curl or
any other HTTP client.


For this task I have used Postman API to test the flow.

● GET servers. Should return all the servers if no parameters are passed. When server id
is passed as a parameter 

First we fetch details of all the servers present in the mongodb.

![image](https://user-images.githubusercontent.com/55399233/235338854-119b97df-483e-4f5b-a92a-337f437f64de.png)

Now we fetch details of all the servers by calling id assigned to each servers object in mongodb.

![image](https://user-images.githubusercontent.com/55399233/235338915-3d95c3cb-2d5d-4426-abbd-29693a809d50.png)

#####################################################################################################################


● DELETE a server. The parameter is a server ID.
  
![image](https://user-images.githubusercontent.com/55399233/235339489-be76853c-0fa0-487a-a259-acf269ccb2c0.png)
 
 
 Request to see if changes have been made after delete request of server id=789. 
 
 ![image](https://user-images.githubusercontent.com/55399233/235339499-f931e1ed-3b8b-4359-a15d-e6d9a92cff2f.png)

 We can see server with id=789 has been deleted
 
 
#####################################################################################################################


● GET (find) servers by name. The parameter is a string. Must check if a server name
contains this string

Getting server name "Ubuntu" by name parameter:

![image](https://user-images.githubusercontent.com/55399233/235339527-05be4afb-5374-4ff4-83ff-a96cbd34baa0.png)





 
 
 
 
 
