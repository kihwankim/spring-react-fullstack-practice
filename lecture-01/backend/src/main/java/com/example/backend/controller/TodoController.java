package com.example.backend.controller;

import com.example.backend.domain.Todo;
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
public class TodoController {

    @Autowired
    private TodoHardcodedService todoService;

    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodoes(@PathVariable String username) {
        return this.todoService.findAll();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable String username, @PathVariable long id) {
        Todo todo = this.todoService.deleteById(id);
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id) {
        return this.todoService.findById(id);
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody Todo todo) {
        Todo todoUpdated = this.todoService.save(todo);

        return new ResponseEntity<>(todoUpdated, HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Void> updateTodo(
            @PathVariable String username, @RequestBody Todo todo) {
        Todo createdTodo = this.todoService.save(todo);

        // Location
        // Get current resource url
        // {id}
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();

        return ResponseEntity.created(uri).build();
    } // 해당 url로 전근 후 실행 return 201해준다.
}
