package com.example.backend.controller;

import com.example.backend.domain.Todo;
import com.example.backend.repository.TodoJpaRepository;
import com.example.backend.service.TodoHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/jpa")
public class TodoJpaController {

    @Autowired
    private TodoHardcodedService todoService;

    @Autowired
    private TodoJpaRepository todoJpaRepository;

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodoes(@PathVariable String username) {
        return this.todoJpaRepository.findByUsername(username);
    } // find all todo by using username

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable String username, @PathVariable long id) {
        this.todoJpaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id) {
        return this.todoJpaRepository.findById(id).get();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username,
                                           @PathVariable long id,
                                           @RequestBody Todo todo) {
        todo.setUsername(username);
        Todo todoUpdated = this.todoJpaRepository.save(todo);

        return new ResponseEntity<>(todoUpdated, HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable String username,
                                           @RequestBody Todo todo) {
        todo.setUsername(username);
        Todo createdTodo = this.todoJpaRepository.save(todo);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdTodo.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    } // 해당 url로 전근 후 실행 return 201해준다.
}
