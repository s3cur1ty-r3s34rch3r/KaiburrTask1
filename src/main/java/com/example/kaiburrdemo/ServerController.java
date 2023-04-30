package com.example.kaiburrdemo;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servers")
public class ServerController {

    private final ServerRepository serverRepository;

    @Autowired
    public ServerController(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    @GetMapping
    public ResponseEntity<List<Server>> getAllServers(@RequestParam(required = false) String id) {
        if (id == null) {
            List<Server> servers = serverRepository.findAll();
            return new ResponseEntity<>(servers, HttpStatus.OK);
        } else {
            Optional<Server> server = serverRepository.findById(id);
            if (server.isPresent()) {
                return new ResponseEntity<>(List.of(server.get()), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }

    @GetMapping("/find")
    public ResponseEntity<List<Server>> getServersByName(@RequestParam String name) {
        List<Server> servers = serverRepository.findByNameContainingIgnoreCase(name);
        if (servers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(servers, HttpStatus.OK);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Server> updateServer(@PathVariable String id, @RequestBody Server server) {
        Optional<Server> optionalServer = serverRepository.findById(id);
        if (optionalServer.isPresent()) {
            Server existingServer = optionalServer.get();
            existingServer.setName(server.getName());
            existingServer.setLanguage(server.getLanguage());
            existingServer.setFramework(server.getFramework());
            serverRepository.save(existingServer);
            return new ResponseEntity<>(existingServer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServer(@PathVariable String id) {
        Optional<Server> optionalServer = serverRepository.findById(id);
        if (optionalServer.isPresent()) {
            serverRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

