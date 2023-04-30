package com.example.kaiburrdemo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerRepository extends MongoRepository<Server, String> {

    List<Server> findByNameContainingIgnoreCase(String name);

}